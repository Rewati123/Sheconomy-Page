import { NextResponse } from 'next/server';

import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { sendVideoCompletionEmail, sendAdminNotification } from '../../../utils/emailUtils';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { userId, videoId, progress, completed } = await req.json();

  if (!userId || !videoId || progress === undefined || completed === undefined) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const updatedProgress = await prisma.videoProgress.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      update: {
        progress,
        completed,
      },
      create: {
        userId,
        videoId,
        progress,
        completed,
      },
    });

    if (completed) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { application: true },
      });

      const video = await prisma.video.findUnique({
        where: { id: videoId },
      });

      

      if (user && video) {
       
      
        await sendVideoCompletionEmail(user.email, user.application.fullName, video.title);
        await sendAdminNotification(user.email, user.application.fullName, video.title);
      }
      
    }

    return NextResponse.json({
      message: 'Video progress updated successfully',
      progress: updatedProgress,
    });
  } catch (error) {
    console.error('Error updating video progress:', error);
    return NextResponse.json(
      { message: 'Error updating video progress' },
      { status: 500 }
    );
  }
}
