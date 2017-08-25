

export class ToolServices {
   public static getDateInString(date) {
      if (!date) {
         return null;
      }
      date = new Date(date);
      let d = date.getDate();
      let m = date.getMonth() + 1;
      let y = date.getFullYear();
      let dateString = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)

      return { dateString: dateString }
   }

   public static getDateAndTimeSlots(slots) {
      let newSlots = [];
      if (slots && slots.length > 0) {
         for (let i = 0; i < slots.length; i++) {
            let dateSlot = slots[i];
            let date = new Date(dateSlot);
            let d = date.getDate();
            let m = date.getMonth() + 1;
            let y = date.getFullYear();
            let h = date.getHours();
            let min = date.getMinutes();
            let med = 'AM'
            if (h > 12) {
               h = h - 12;
               med = 'PM'
            }
            let dateString = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
            let timeString = (h < 10 ? '0' + h : h) + ':' + (min < 10 ? '0' + min : min) + ' ' + med;
            let dateObj = {};
            dateObj['slot'] = dateSlot;
            dateObj['timeSlot'] = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (min < 10 ? '0' + min : min);
            dateObj['dateString'] = dateString;
            dateObj['timeString'] = timeString;
            newSlots.push(dateObj);
         }
      }
      return newSlots;
   }

   public static deg2rad(lat) {
      return Math.PI * lat / 180;
   }

   public static rad2deg(dig) {
      return dig * 180 / Math.PI;
   }
}