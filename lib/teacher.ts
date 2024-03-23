export const isTeacher = (userId?: string | null) => {
    // Checking if the user ID matches the teacher ID stored in the environment variable NEXT_PUBLIC_TEACHER_ID
    return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
  }