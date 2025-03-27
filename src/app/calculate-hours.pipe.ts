import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateHours'
})
export class CalculateHoursPipe implements PipeTransform {

  //transform(value: unknown, ...args: unknown[]): unknown {
 //   return null;
 // }

 transform(startTime?: string, endTime?: string, p0?: boolean): string  {
  if (!startTime || !endTime) return '0m'; // Handle undefined values

  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);

  const diffInMs = end.getTime() - start.getTime();
  const diffInMinutes = diffInMs / (1000 * 60); // Convert to minutes

  const hours = Math.floor(diffInMinutes / 60); // Get whole hours
  const minutes = Math.floor(diffInMinutes % 60); // Get remaining minutes

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}m`; // Example: "2h 30m"
  } else if (hours > 0) {
    return `${hours}h`; // Example: "2h"
  } else {
    return `${minutes}m`; // Example: "30m"
  }
}
}

