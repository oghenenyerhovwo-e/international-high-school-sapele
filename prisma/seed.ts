import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed...')

  // Create Sessions
  const sessions = await Promise.all([
    prisma.session.upsert({
      where: { name: '2023/2024' },
      update: {},
      create: {
        name: '2023/2024',
        is_current: false,
      },
    }),
    prisma.session.upsert({
      where: { name: '2024/2025' },
      update: {},
      create: {
        name: '2024/2025',
        is_current: true,
      },
    }),
  ])

  // Create Terms
  await Promise.all([
    prisma.term.upsert({
      where: { name: 'First Term' },
      update: {},
      create: {
        name: 'First Term',
        order: 1,
      },
    }),
    prisma.term.upsert({
      where: { name: 'Second Term' },
      update: {},
      create: {
        name: 'Second Term',
        order: 2,
      },
    }),
    prisma.term.upsert({
      where: { name: 'Third Term' },
      update: {},
      create: {
        name: 'Third Term',
        order: 3,
      },
    }),
  ])

  // Create Classes
  const classes = await Promise.all([
    prisma.class.upsert({
      where: { level_name: { level: 'JS1', name: 'A' } },
      update: {},
      create: {
        level: 'JS1',
        name: 'A',
        full_name: 'JS1 A',
      },
    }),
    prisma.class.upsert({
      where: { level_name: { level: 'JS1', name: 'B' } },
      update: {},
      create: {
        level: 'JS1',
        name: 'B',
        full_name: 'JS1 B',
      },
    }),
    prisma.class.upsert({
      where: { level_name: { level: 'JS2', name: 'A' } },
      update: {},
      create: {
        level: 'JS2',
        name: 'A',
        full_name: 'JS2 A',
      },
    }),
    prisma.class.upsert({
      where: { level_name: { level: 'JS3', name: 'A' } },
      update: {},
      create: {
        level: 'JS3',
        name: 'A',
        full_name: 'JS3 A',
      },
    }),
    prisma.class.upsert({
      where: { level_name: { level: 'SS1', name: 'A' } },
      update: {},
      create: {
        level: 'SS1',
        name: 'A',
        full_name: 'SS1 A',
      },
    }),
  ])

  // Create Subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({
      where: { name: 'Mathematics' },
      update: {},
      create: {
        name: 'Mathematics',
        code: 'MAT101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'English Language' },
      update: {},
      create: {
        name: 'English Language',
        code: 'ENG101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'Physics' },
      update: {},
      create: {
        name: 'Physics',
        code: 'PHY101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'Chemistry' },
      update: {},
      create: {
        name: 'Chemistry',
        code: 'CHE101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'Biology' },
      update: {},
      create: {
        name: 'Biology',
        code: 'BIO101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'Geography' },
      update: {},
      create: {
        name: 'Geography',
        code: 'GEO101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'History' },
      update: {},
      create: {
        name: 'History',
        code: 'HIS101',
      },
    }),
    prisma.subject.upsert({
      where: { name: 'Computer Science' },
      update: {},
      create: {
        name: 'Computer Science',
        code: 'COM101',
      },
    }),
  ])

  // Create a sample teacher and use it for assignments
  const teacherPassword = await bcrypt.hash('temp123', 12)
  const teacher = await prisma.teacher.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      first_name: 'John',
      last_name: 'Smith',
      email: 'teacher@school.com',
      username: 'john.smith',
      password_hash: teacherPassword,
      force_password_change: true,
    },
  })

  // Create a sample admin teacher
  const adminPassword = await bcrypt.hash('admin123', 12)
  await prisma.teacher.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@school.com',
      username: 'admin',
      password_hash: adminPassword,
      force_password_change: true,
    },
  })

  // Create class curriculum for current session
  const currentSession = sessions.find(s => s.is_current)!
  const js1Class = classes.find(c => c.full_name === 'JS1 A')!

  for (const subject of subjects) {
    await prisma.classCurriculum.upsert({
      where: {
        class_id_subject_id_session_id: {
          class_id: js1Class.id,
          subject_id: subject.id,
          session_id: currentSession.id,
        },
      },
      update: {},
      create: {
        class_id: js1Class.id,
        subject_id: subject.id,
        session_id: currentSession.id,
        is_core: true,
      },
    })
  }

  // Assign teacher to class and subject - USING the teacher variable
  await prisma.teacherAssignment.upsert({
    where: {
      class_id_subject_id_session_id: {
        class_id: js1Class.id,
        subject_id: subjects[0].id, // Mathematics
        session_id: currentSession.id,
      },
    },
    update: {},
    create: {
      teacher_id: teacher.id, // Using the teacher variable here
      class_id: js1Class.id,
      subject_id: subjects[0].id,
      session_id: currentSession.id,
    },
  })

  // Create a sample student and use it for enrollment
  const studentPassword = await bcrypt.hash('student123', 12)
  const student = await prisma.student.upsert({
    where: { admission_number: 'STD001' },
    update: {},
    create: {
      admission_number: 'STD001',
      first_name: 'Alice',
      last_name: 'Johnson',
      current_class_id: js1Class.id,
      username: 'STD001',
      password_hash: studentPassword,
      force_password_change: true,
    },
  })

  // Enroll student in subjects - USING the student variable
  const classCurriculums = await prisma.classCurriculum.findMany({
    where: {
      class_id: js1Class.id,
      session_id: currentSession.id,
    },
  })

  for (const curriculum of classCurriculums) {
    await prisma.studentSubject.upsert({
      where: {
        student_id_class_curriculum_id: {
          student_id: student.id, // Using the student variable here
          class_curriculum_id: curriculum.id,
        },
      },
      update: {},
      create: {
        student_id: student.id,
        class_curriculum_id: curriculum.id,
      },
    })
  }

  console.log('Seed completed successfully!')
  console.log('Sample login credentials:')
  console.log('Admin: admin@school.com / admin123')
  console.log('Teacher: teacher@school.com / temp123') 
  console.log('Student: STD001 / student123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })