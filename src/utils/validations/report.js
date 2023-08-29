import dayjs from 'dayjs';
import { z } from 'zod';

const reportVaildation = z.object({
  fromDate: z.coerce
    .date()
    .min(new Date('2023-01-01'), { message: 'Date is too Old' }),
  toDate: z.coerce.date(),
});
export default reportVaildation;
