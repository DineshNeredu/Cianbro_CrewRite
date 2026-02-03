define([], () => {
  'use strict';

  class PageModule {
    getFirstDate(rangeString) {
      if (rangeString) {
        if (typeof rangeString !== 'string') return null;
        const parts = rangeString.split(' to ');
        return parts[0] || null;
      }

    };
    getTableColumns() {    
      let columns = [
        { "headerText": "SNo", "field": "","template":"sno" }, 
        { "headerText": "Crew Name", "field": "crew_name" }, 
        { "headerText": "Supervisor", "field": "supervisor" },
        { "headerText": "Monday", "field": "monday","template":"hpyerlink"}, 
        { "headerText": "Tuesday", "field": "tuesday","template":"hpyerlink" }, 
        { "headerText": "Wednesday", "field": "wednesday","template":"hpyerlink" }, 
        { "headerText": "Thursday", "field": "thursday","template":"hpyerlink" }, 
        { "headerText": "Friday", "field": "friday" ,"template":"hpyerlink"}, 
        { "headerText": "Saturday", "field": "saturday","template":"hpyerlink" }, 
        { "headerText": "Sunday", "field": "sunday","template":"hpyerlink" }
      ];
      return columns;
    }
    parseDDMMMYYYY(dateStr) {
      const [day, monthStr, year] = dateStr.split("-");
      const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
      return new Date(year, months[monthStr], day);
    }
    getDateRangeArray(startDateStr, endDateStr) {
      const result = [];
      const startDate = this.parseDDMMMYYYY(startDateStr);
      const endDate = this.parseDDMMMYYYY(endDateStr);

      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let id = 1;

      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dayName = days[d.getDay()];
        const formattedDate =
          String(d.getDate()).padStart(2, "0") + "-" +
          String(d.getMonth() + 1).padStart(2, "0") + "-" +
          d.getFullYear();

        result.push({
          id: id++,
          value: dayName,
          label: formattedDate
        });
      }
      return result;
    }
    getColorCodes(data){
      debugger;
      if(data){
        if(data==='Not Submitted'){
          return 'orangeclass';
        }
        else if(data==='Submitted'){
          return 'greenclass1';
        }
        else{
          return '';
        }

      }
    }


  getDatesWithWeekdays(startStr, endStr) {
  const months = {
    jan:0, feb:1, mar:2, apr:3, may:4, jun:5,
    jul:6, aug:7, sep:8, oct:9, nov:10, dec:11
  };
  function parseDate(str) {
    const [day, mon, year] = str.split('-');
    return new Date(year, months[mon.toLowerCase()], day);
  }
  const startDate = parseDate(startStr);
  const endDate = parseDate(endStr);
  const result = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    result.push({
      date: d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      weekday: d.toLocaleDateString('en-IN', { weekday: 'long' })
    });
    }

  return result;
}

    getDatesArray(rangeStr) {
      const months = {
        jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
      };

      const [startStr, endStr] = rangeStr.split(' - ');

      function toDate(str) {
        const [dd, mon, yyyy] = str.split('-');
        return new Date(yyyy, months[mon.toLowerCase()], dd);
      }

      let start = toDate(startStr);
      const end = toDate(endStr);
      const dates = [];

      while (start <= end) {
        const d = String(start.getDate()).padStart(2, '0');
        const m = start.toLocaleString('en-US', { month: 'short' });
        const y = start.getFullYear();

        dates.push(`${d}-${m}-${y}`);
        start.setDate(start.getDate() + 1);
      }

      return dates;
    }

    getTableColumnsWithDates(week) {  
      if(week){
        // debugger;
        let day1 = week.split('to')[0];
        let day2 = week.split('to')[1];
        const weekDays = this.getDatesWithWeekdays(day1,day2);
        let columns = [
           { "headerText": "SNo", "field": "","template":"sno" }, 
          { "headerText": "Crew Name", "field": "crew_name" },
          { "headerText": "Supervisor", "field": "supervisor" }
        ];
          weekDays.forEach((itm)=>{
            let obj= { "headerText": itm.date +" "+ itm.weekday, "field": itm.weekday.toLocaleLowerCase() ,"width":150,"template":"hpyerlink","style":"text-align:center"};
            columns.push(obj);         
          });      
    
      return columns;
      }  
     
    };
  }

  return PageModule;
});
