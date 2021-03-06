function grid(elem)
	{
		var oSelf = this;
		this.grid = [];
		this.curRowIndex = 0;
        this.curCellIndex = 0;
		this.wrapRow = false;
		this.wrapCol = false;
		//exposed method
		this.init = function(){
			var rows = $(elem).find("[role='row']");
			for(var v=0; v<rows.length; v++){
                oSelf.grid.push([]);
				var cells = $(rows[v]).find("[role='gridcell'], [role='columnheader']");
				for(var i=0; i<cells.length; i++){
					oSelf.grid[v].push(cells[i]);
                     if($(cells[i]).attr('tabindex')=='0'){
						oSelf.curRowIndex = v; 
						oSelf.curCellIndex = i;
					}
				}
			}
			//bind events 
			oSelf.bindEvents();
		
			//set default cell
			oSelf.setActiveCell(0,0);
			
			return {'grid':oSelf.grid, 'curRowIndex':oSelf.curRowIndex, 'curCellIndex':oSelf.curCellIndex};
		};
		
		//exposed method
		this.setActiveCell = function(row, col){
			if((row >= 0 && row.toString().indexOf('.') == -1) && (col >= 0 && col.toString().indexOf('.') == -1)){ 
				$(oSelf.grid[row][col]).trigger("click"); //setCurrentCell will fire
			}
			
		};
		//exposed method
		this.setWrapCol = function(bWrapCol){
			if(typeof !!bWrapCol !== 'boolean'){ return }
			oSelf.wrapCol = bWrapCol;
		};
		//exposed method
		this.setWrapRow = function(bWrapRow){
			if(typeof !!bWrapRow !== 'boolean'){ return }
			oSelf.wrapRow = bWrapRow;
		};
		this.bindEvents = function(){
			$(elem).find('[role="gridcell"], [role="columnheader"]').on('keydown click focus', oSelf.handleEvents).focus();
		};
		
		this.moveToCell = function(sDirection){
			switch(sDirection){
			    
				//left
				case 37:
						//if reached 1st cell in a row
						if(oSelf.curCellIndex-1 >= 0){
							$(oSelf.grid[oSelf.curRowIndex][oSelf.curCellIndex]).attr({style: 'background-color:none',tabindex:'-1' });//.blur();
							oSelf.curCellIndex--;
						}
						else{
							//stop going beyond limit and wrap
							if(oSelf.curRowIndex-1 >= 0  && oSelf.wrapRow){
								oSelf.curRowIndex--; oSelf.curCellIndex=oSelf.grid[0].length-1;
							}
						}
				break;
				
				//up
				case 38:
						if(oSelf.curRowIndex-1 >= 0){
							$(oSelf.grid[oSelf.curRowIndex][oSelf.curCellIndex]).attr({style: 'background-color:none',tabindex:'-1' });//.blur();
							oSelf.curRowIndex--;	
						}
						else{
							if(oSelf.curCellIndex-1 >= 0 && oSelf.wrapCol){
								oSelf.curCellIndex--; oSelf.curRowIndex=oSelf.grid.length-1;
							}
						}
				break;
				
				//right
				case 39:
						if(oSelf.curCellIndex+1 <= oSelf.grid[0].length-1){
							$(oSelf.grid[oSelf.curRowIndex][oSelf.curCellIndex]).attr({style: 'background-color:none',tabindex:'-1' });//.blur();
							oSelf.curCellIndex++;
						}
						else{
							if(oSelf.curRowIndex+1 <= oSelf.grid.length-1 && oSelf.wrapRow){
								oSelf.curRowIndex++;oSelf.curCellIndex=0;
							}
						}
				break;
				
				//down
				case 40:
						if(oSelf.curRowIndex+1 <= oSelf.grid.length-1){
							$(oSelf.grid[oSelf.curRowIndex][oSelf.curCellIndex]).attr({style: 'background-color:none',tabindex:'-1' });//.blur();
							oSelf.curRowIndex++;
						}
						else{
							if(oSelf.curCellIndex+1 <=  oSelf.grid[0].length-1 && oSelf.wrapCol){
								oSelf.curCellIndex++; oSelf.curRowIndex=0;
							}
						}						
				break;
			}
			$(oSelf.grid[oSelf.curRowIndex][oSelf.curCellIndex]).trigger("click");
		};
		
		this.setCurrentCell = function(e){
			e.stopPropagation();
			var focusedElem = e.target;
			if($(focusedElem).attr('role')==='gridcell' || $(focusedElem).attr('role')==='columnheader'){
				for(var v=0; v<oSelf.grid.length; v++){
					for(var i=0; i<oSelf.grid[v].length; i++){
						//set tabindex 0 to the currently selected cell and -1 for all other cells in the grid
						if($(focusedElem).is($(oSelf.grid[v][i]))){ 
							$(focusedElem).focus().attr({style: 'background-color:pink',tabindex:'0' });
							oSelf.curRowIndex = v; 
							oSelf.curCellIndex = i;
						}
						else{
							$(oSelf.grid[v][i]).attr({style: 'none',tabindex:'-1' });
						}
						
					}
				}	
			}
		};
		
		this.handleEvents = function(e){
			var aKeyCodes = [39,37,38,40];
			switch(e.type){	
				case 'keydown':
					if(aKeyCodes.indexOf(e.keyCode)== -1){ return;}
					oSelf.moveToCell(e.keyCode);
				break;
				
				case 'click':
					oSelf.setCurrentCell(e);
				break;
				
				case 'focus':
					//alert('got focus');
				break;
			}
		};
	};
