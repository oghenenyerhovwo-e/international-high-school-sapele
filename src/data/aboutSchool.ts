import { 
    schoolDayPic,
    jambHeroesPic,
    sportPic,
    technologyPic,
    femaleProfilePic,
} from '@/assets';

// Sample images - replace with your actual images
export const heroImages = [
    {
        src: schoolDayPic,
        alt: "School day program",
        caption: "Engaging school day programs for holistic development"
    },
    {
        src: sportPic,
        alt: "Football team",
        caption: "Sport"
    },
    {
        src: jambHeroesPic,
        alt: "some of the best waec and jamb result in the country",
        caption: "We have some of the best waec and jamb results in the country"
    },
    {
        src: technologyPic,
        alt: "Students in computer lab",
        caption: "Technology-integrated learning spaces"
    },
];

export const classSubjectsInfo = [
    {
      id: 'js1',
      name: 'JS1',
      level: 'Junior Secondary',
      description: 'Foundation year introducing core subjects',
      subjects: [
        { name: 'Mathematics (GSC - Geometry and Statistics)' },
        { name: 'Mathematics (AGB - Algebra)' },
        { name: 'Mathematics (TM - Trigonometry)' },
        { name: 'Composition' },
        { name: 'Comprehension' },
        { name: 'Lexis and Structure' },
        { name: 'Phonetics' },
        { name: 'Literature' },
        { name: 'Basic Science' },
        { name: 'Basic Technology' },
        { name: 'Information Technology' },
        { name: 'Agricultural Science' },
        { name: 'Social Studies' },
        { name: 'Civic Education' },
        { name: 'History' },
        { name: 'Cultural and Creative Arts' },
        { name: 'Christian Religious Knowledge' },
        { name: 'Music' },
        { name: 'Home Economics' },
        { name: 'Urhobo' }
      ],
      color: 'var(--clr-primary)'
    },
    {
      id: 'js2',
      name: 'JS2',
      level: 'Junior Secondary',
      description: 'Building on foundational knowledge with more depth',
      subjects: [
        { name: 'Mathematics (GSC - Geometry and Statistics)' },
        { name: 'Mathematics (AGB - Algebra)' },
        { name: 'Mathematics (TM - Trigonometry)' },
        { name: 'Composition' },
        { name: 'Comprehension' },
        { name: 'Lexis and Structure' },
        { name: 'Phonetics' },
        { name: 'Literature' },
        { name: 'Basic Science' },
        { name: 'Basic Technology' },
        { name: 'Information Technology' },
        { name: 'Agricultural Science' },
        { name: 'Social Studies' },
        { name: 'Civic Education' },
        { name: 'History' },
        { name: 'Cultural and Creative Arts' },
        { name: 'Christian Religious Knowledge' },
        { name: 'Music' },
        { name: 'Home Economics' },
        { name: 'Urhobo' }
      ],
      color: 'var(--clr-secondary)'
    },
    {
      id: 'js3',
      name: 'JS3',
      level: 'Junior Secondary',
      description: 'Preparation for senior secondary with focused curriculum',
      subjects: [
        { name: 'Mathematics' },
        { name: 'English Language' },
        { name: 'Literature' },
        { name: 'Basic Science' },
        { name: 'Basic Technology' },
        { name: 'Information Technology' },
        { name: 'Agricultural Science' },
        { name: 'Social Studies' },
        { name: 'Civic Education' },
        { name: 'History' },
        { name: 'Cultural and Creative Arts' },
        { name: 'Christian Religious Knowledge' },
        { name: 'Music' },
        { name: 'Home Economics' },
        { name: 'Urhobo' }
      ],
      color: 'var(--clr-accent)'
    },
    {
      id: 'ss1',
      name: 'SS1',
      level: 'Senior Secondary',
      description: 'Broad curriculum before specialization',
      subjects: [
        { name: 'Mathematics (GSC - Geometry and Statistics)' },
        { name: 'Mathematics (AGB - Algebra)' },
        { name: 'Mathematics (TM - Trigonometry)' },
        { name: 'Further Mathematics' },
        { name: 'Composition' },
        { name: 'Comprehension' },
        { name: 'Lexis and Structure' },
        { name: 'Phonetics' },
        { name: 'Literature' },
        { name: 'Chemistry' },
        { name: 'Physics' },
        { name: 'Biology' },
        { name: 'Computer Science' },
        { name: 'Agricultural Science' },
        { name: 'Government' },
        { name: 'Civic Education' },
        { name: 'Christian Religious Knowledge' },
        { name: 'Technical Drawing' },
        { name: 'Geography' },
        { name: 'Economics' }
      ],
      color: '#8A2BE2'
    },
    {
      id: 'ss2-science',
      name: 'SS2 Science',
      level: 'Senior Secondary',
      description: 'Science stream with focus on core STEM subjects',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Chemistry', category: 'Science' },
        { name: 'Physics', category: 'Science' },
        { name: 'Biology', category: 'Science' },
        { name: 'Further Mathematics', category: 'Science' },
        { name: 'Computer Science', category: 'Science' },
        { name: 'Technical Drawing', category: 'Science' },
        { name: 'Agricultural Science', category: 'Elective' }
      ],
      color: '#228B22'
    },
    {
      id: 'ss2-art',
      name: 'SS2 Art',
      level: 'Senior Secondary',
      description: 'Arts and humanities focused curriculum',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Literature', category: 'Arts' },
        { name: 'Government', category: 'Arts' },
        { name: 'Economics', category: 'Arts' },
        { name: 'Geography', category: 'Arts' },
        { name: 'Christian Religious Knowledge', category: 'Arts' },
        { name: 'History', category: 'Arts' },
        { name: 'Civic Education', category: 'Arts' }
      ],
      color: '#DC143C'
    },
    {
      id: 'ss3-science',
      name: 'SS3 Science',
      level: 'Senior Secondary',
      description: 'Final year preparation for science students',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Chemistry', category: 'Science' },
        { name: 'Physics', category: 'Science' },
        { name: 'Biology', category: 'Science' },
        { name: 'Further Mathematics', category: 'Science' }
      ],
      color: '#20B2AA'
    },
    {
      id: 'ss3-art',
      name: 'SS3 Art',
      level: 'Senior Secondary',
      description: 'Final year preparation for arts students',
      subjects: [
        { name: 'Mathematics', category: 'Core' },
        { name: 'English Language', category: 'Core' },
        { name: 'Literature', category: 'Arts' },
        { name: 'Government', category: 'Arts' },
        { name: 'Economics', category: 'Arts' },
        { name: 'Christian Religious Knowledge', category: 'Arts' }
      ],
      color: '#FF8C00'
    }
  ]

  export const schoolTestimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Parent of JS2 Student',
      content: 'This school has been a blessing for my daughter. The teachers are dedicated, the curriculum is well-structured, and the facilities are excellent. Her confidence has grown tremendously since she started here.',
      rating: 5,
      avatar: femaleProfilePic,
    },
]

export const schoolDetails = {
  email: "ihssapele1995@gmail.com",
  name: "International High School, Sapele",
  phone: "+234 8060568054",
  address: "168, Okpe Road Junction by Sapele-Warri Road, Ajogodo, Sapele, Nigeria",
  facebookLink: "https://web.facebook.com/profile.php?id=100077721754430",
  tiktokLink: "https://www.tiktok.com/@ijsihs_sapele",
}