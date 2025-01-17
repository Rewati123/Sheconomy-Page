import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import prisma from '../../lib/prisma';
import VideoList from '../../components/VideoList';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const userEmail = session.user?.email ?? null;

  if (!userEmail) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    include: { application: true, videoProgress: { include: { video: true } } },
  });

  if (!user) {
    redirect('/login');
  }

  const videos = await prisma.video.findMany({
    include: {
      progress: {
        where: { userId: user.id },
      },
    },
  });

  const hasCompletedCourse = (user: any) => {
    const totalVideos = videos.length;
    const completedVideos = user.videoProgress.filter((vp: any) => vp.completed).length;
    return completedVideos === totalVideos;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className=" shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome, {user.application.fullName}!
            </h2>
            <p className="mt-2 text-gray-600">Here are your program videos:</p>
            <VideoList videos={videos} userId={user.id} />
            {hasCompletedCourse(user) && (
              <div className="mt-8">
                <a
                  href={`/api/generate-certificate?userId=${user.id}`}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Certificate
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
