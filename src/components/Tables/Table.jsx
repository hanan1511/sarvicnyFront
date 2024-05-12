import { GridComponent, ColumnDirective, ColumnsDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject,Selection } from '@syncfusion/ej2-react-grids';
import Style from "./Table.module.css";
import React, { useState, useEffect } from "react";

function Table({ data, columns,handleRowClick}){
    const editing = { allowDeleting: true, allowEditing: true };
    return (
        <>
        <div className={` bg-light rounded`}>
            <GridComponent dataSource={data}
             allowPaging
             allowSorting
             allowExcelExport
             allowPdfExport
             editSettings={editing}
             rowSelected={(args) => handleRowClick(args.data)}>
            {/* Define columns for the grid */}
            <ColumnsDirective >
                {columns.map((item,index)=>(
                    <ColumnDirective key={index} {...item}/>
                ))}
            </ColumnsDirective>
    
            {/* Enable additional features like sorting, resizing, etc. */}
            <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport,Selection]} />
            </GridComponent>
        </div>
        </>
    );
}
export default Table;