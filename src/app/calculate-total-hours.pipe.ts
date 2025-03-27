import { Pipe, PipeTransform } from '@angular/core';
interface TimeResult {
  hours: number;
  minutes: number;
  formatted: string;
}
@Pipe({
  name: 'calculateTotalHours'
})
export class CalculateTotalHoursPipe implements PipeTransform {

  transform(startTime?: string, endTime?: string, returnObject: boolean = false): TimeResult | string {
    if (!startTime || !endTime) return returnObject ? { hours: 0, minutes: 0, formatted: '0m' } : '0m';

    const start = new Date(`1970-01-01T${startTime}`);
    const end = new Date(`1970-01-01T${endTime}`);

    const diffInMs = end.getTime() - start.getTime();
    const diffInMinutes = diffInMs / (1000 * 60); // Convert to minutes

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = Math.floor(diffInMinutes % 60);

    const formatted = hours > 0 && minutes > 0 ? `${hours}h ${minutes}m` :
                      hours > 0 ? `${hours}h` :
                      `${minutes}m`;

    return returnObject ? { hours, minutes, formatted } : formatted;
  }
}

