# ARIA-grid-navigation
Add arrow key navigation inside a grid used for accessibility

# USAGE
var g = new grid($('#grid')); // pass the container element of the grid

g.init(); // initializ the grid

g.setActiveCell(2,1); // sets active cell of row 2 and col 1

g.setWrapCol(true); // allows navigation to wrap to next coloumn when last coloumn is reached

g.setWrapRow(true); // allows navigation to wrap to next row when last row is reached


# PREREQUISITE
1 - Depends on jQuery library 

2 - The grid element must specify aria roles in html as role='grid' for the container element, role='row' for grid rows and role='gridcell' for cells. It will also treat column headers as a cell, if role='columnheader' is specified
