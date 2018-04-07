      google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      var table = null;
      var data = null;

      function drawTable() {
        setTable(5,5);
      }

      function setTable(colNum, rowNum) {
        data = new google.visualization.DataTable();

        var x = 0;
        for (x=0;x<colNum;x++){
        data.addColumn('number', x.toString());
        }
        var arr = [];

           // Creates all lines:
          for(var i=0; i < rowNum; i++){

              // Creates an empty line
              arr.push([]);

              // Adds cols to the empty line:
              arr[i].push( new Array(colNum));

              for(var j=0; j < colNum; j++){
                // Initializes:
                arr[i][j] = Math.random();
              }
          }

        data.addRows(arr);

        var view = new google.visualization.DataView(data);


        table = new google.visualization.Table(document.getElementById('table_div'));
        google.visualization.events.addListener(table, 'select', selectHandler);

        reDraw();

      }



      function selectHandler() {


      }

      function addRow(){
        var rowId = data.addRow();
        data.insertRows(0, 1)
        reDraw();
        flashRow(1,"orange");
      }

      function copyRow(){
        var numCols = data.getNumberOfColumns();
        var arr = [];
        arr.push([]);
        arr[0].push( new Array(numCols));
        var selection = table.getSelection();
        var item = selection[0];

        var i;
        for(var i=0; i < numCols; i++){
         arr[0][i] = data.getValue(item.row,i);
        }
        data.insertRows(0, arr);
        reDraw();
        flashRow(1,"orange");

      }

      function reDraw(){
         console.time('reDraw');
         table.draw(data, {showRowNumber: true, width: '100%', height: '100%',
         page: 'enable',
                 pageSize: 50,
                 pagingSymbols: {
                     prev: 'prev',
                     next: 'next'
                 },
                 pagingButtonsConfiguration: 'auto'});
         console.timeEnd('reDraw');
      }


      function deleteRow(){
       var selection = table.getSelection();
       var item = selection[0];
       data.removeRow(item.row);
       reDraw();

      }


      function setTableSize(){
        var colCount = document.getElementById( 'colCount' ).value;
        var rowCount = document.getElementById( 'rowCount' ).value
        setTable(colCount, rowCount);
      }

      function setCellVal(){
            var row = Number(document.getElementById( 'row' ).value);
            var col = Number(document.getElementById( 'col' ).value);
            var val = Number(document.getElementById( 'val' ).value);

            var container = document.getElementById('table_div');
            var tableRow = container.getElementsByTagName('TR')[row];
            var tableColumn = tableRow.getElementsByTagName("TD")[col+1];
            var currentVal = Number(tableColumn.innerHTML);

            data.setCell(row-1,col,val);
            reDraw();

            var newColour = val > currentVal? "green":"red";

            flashColumn(row,col,newColour);
      }

      function flashColumn(row, col, colour){
        var container = document.getElementById('table_div');
        var tableRow = container.getElementsByTagName('TR')[row];
        var tableColumn = tableRow.getElementsByTagName("TD")[col+1];


        tableColumn.style.backgroundColor = colour;
             setTimeout(function() {
                tableColumn.style.backgroundColor = 'white';
              }, 1000);
       }


       function flashRow(row, colour){
        var container = document.getElementById('table_div');
        var tableRow = container.getElementsByTagName('TR')[row];

        tableRow.style.backgroundColor = colour;
        setTimeout(function() {
            tableRow.style.backgroundColor = 'white';
          }, 1000);
        }


