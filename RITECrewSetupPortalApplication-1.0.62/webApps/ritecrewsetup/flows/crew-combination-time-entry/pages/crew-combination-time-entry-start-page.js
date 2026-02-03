/**
 * Copyright (c)2020, 2026, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 */
define(["ojs/ojarraydataprovider"], function (ArrayDataProvider) {
  "use strict";

  class PageModule {
    constructor() { }
  }
   let headerDtls = [
      {
        "id": 1,
        "name": "Project",        
      },
      {
        "id": 2,
        "name": "Task"
      },
      {
        "id": 3,
        "name": "Shift"
      },
      {
        "id": 4,
        "name": "Work Package"
      },
      {
        "id": 5,
        "name": "Location"
      },
      {
        "id": 6,
        "name": "Employee",
        "timetype":"Time Type",
        "jobCode":"Job Code",
        "A":"A",
        "B":"B",
        "C":"C",
        "D":"D",
        "E":"E",
        "F":"F"     
      }
    ];
  PageModule.prototype.geHeaderData = function () {   
    // return new ArrayDataProvider(headerDtls, {
    //   keyAttributes: 'id'
    // });
    return headerDtls;
  };

   PageModule.prototype.geBodyData = function (data) {
    let bodyData=headerDtls;
    debugger;
    if(data){
      data.forEach((itm)=>{
        let obj = {
          "id": headerDtls.length + 1,
          "name": itm.resource_name,
          "timetype": itm.resource_type,
          "jobCode": itm.resource_role,
          "A": "",
          "B": "",
          "C": "",
          "D": "",
          "E": "",
          "F": ""
        };
        bodyData.push(obj);
      });
    }
    return bodyData;
    // return new ArrayDataProvider(bodyData, {
    //   keyAttributes: 'id'
    // });
  };
  PageModule.prototype.checkProjectTask= function(name){
    let isInput = true;
    if(name ==='Task'){
      isInput = false;
    }
    else if(name==='Project'){
      isInput = false;
    }
    return isInput;
  };
 
  PageModule.prototype.getDynamicName = function (rowName, colIndex) {
    debugger;
    let col = String.fromCharCode(65 + colIndex-3); // A,B,C,D...
    return rowName + "_" + col;
  };

   PageModule.prototype.getColIndex = function(colKey) {
    debugger;
  return colKey.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3...
};
     PageModule.prototype.getColumnName= function(row) {
      debugger;
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      let field = cols[row.columnIndex - 3];
      return 'Task_' + field;
    };

      PageModule.prototype.getADPTaskData=function(data) {
      return new ArrayDataProvider(data, { keyAttributes: 'TaskName' });
    };

     PageModule.prototype.getIndexedBasedColumn= function(indx) {
      let cols = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
      return cols[indx - 3];
    };
 

  return PageModule;
});




