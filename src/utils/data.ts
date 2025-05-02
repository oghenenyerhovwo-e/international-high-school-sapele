import { StaticImageData } from "next/image";
import { malePic, femalePic } from "@/assets";

export interface Lesson {
    id: string;
    teacherNames: string[];
    teacherImages?: StaticImageData[];
    subjects: string[];
    classes: string[];
    phoneNumber: string;
    whatsappLink?: string;
}
  

export const ihsTeachers: Lesson[] = [
    {
      id: "ihs-1",
      teacherNames: ["Mr. XYZ"],
      teacherImages: [malePic],
      subjects: ["Mathematics", "Further Mathematics"],
      classes: ["JS1", "JS2"],
      phoneNumber: "+2348012345678",
      whatsappLink: "https://wa.me/2348012345678",
    },
    {
      id: "ihs-2",
      teacherNames: ["Ms. ABC", "Mr. CDE"],
      teacherImages: [femalePic, malePic],
      subjects: ["English Language", "Literature"],
      classes: ["JS1"],
      phoneNumber: "+2348098765432",
      whatsappLink: "https://wa.me/2348098765432",
    },
  ];
  
  // Junior School Section (IJS)
  export const ijsTeachers: Lesson[] = [
    {
      id: "ijs-1",
      teacherNames: ["Mr. JKL"],
      teacherImages: [malePic],
      subjects: ["Basic Science", "English"],
      classes: ["KG2", "PRY4", "PRY3"],
      phoneNumber: "+2348123456789",
      whatsappLink: "https://wa.me/2348123456789",
    },
    {
      id: "ijs-2",
      teacherNames: ["Mrs. FGH"],
      teacherImages: [femalePic],
      subjects: ["English", "Maths"],
      classes: ["PR4", "PR1"],
      phoneNumber: "+2347011122233",
      whatsappLink: "https://wa.me/2347011122233",
    },
  ];
  
  // Craft Teachers (empty for now)
  export const craftTeachers: Lesson[] = [];