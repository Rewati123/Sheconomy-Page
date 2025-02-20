export interface Program {
    title: string;
    subtitle: string;
    shortDescription: string;
    description: string;
    image: string;
    startDate: string;
    endDate: string;
    idealForDescription: string;
    timelineDescription: string;
    benefits: {
      benefitId: string;
      title: string;
      description: string;
      icon: string;
    }[];
    testimonials: {
      testimonialId: string;
      name: string;
      designation: string;
      message: string;
      profile: string;
    }[];
  }
  