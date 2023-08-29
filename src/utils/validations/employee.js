import * as z from 'zod';

export const EmployeeValidationSchema = z.object({
  Department: z.string().min(1, { message: 'Department is required' }),
  DDivisions: z.string().min(1, { message: 'Division is required' }),
  employee: z.string().min(1, { message: 'Name is required' }),
  roomno: z.string().min(1, { message: 'Roomno. is required' }),
  extensionno: z.number().default(0),
});
