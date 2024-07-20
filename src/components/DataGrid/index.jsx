import styled from "styled-components";
import { useState } from "react"
import { ReactGrid, Column, Row, Id, CellChange, TextCell, HeaderCell, CellLocation } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

import icone_edit from './Assets/icone_edit.png';
import icone_add from './Assets/icone_add.png';
import icone_delete from './Assets/icone_delete.png';
import icone_save from './Assets/icone_save.png';
//import { Row } from "reactstrap";

import usePost from "../../usePost";
import usePut from "../../usePut";
import useDelete from "../../useDelete";

const GridDiv = styled.div`
    width: 100%; 
    --height: 200px;
    overflow: auto;
    font-weight: 400;
    font-size: 14px;
`
const GridBotao = styled.img`
    padding: 0px 2px;
    width: 24px;
    height: 24px;
`
const GridHeader = styled.div`
    width: 100%; 
    height: 30px;
    background: #F0F0F0;
    margin: 0em 0em;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
`

export default function DataGrid({ endPoint, dadosDataGrid, gridColumns, parentFieldName, parentId, editavel = false }) {

    function buildHeader(gridHeader) {
        var headerReturn = [] ;

        gridHeader.forEach((field, idx) => {
            if (!parentFieldName || parentFieldName.search(field.fieldId) < 0) {
                headerReturn.push( { type: "header", text: `${field.headerName}` } )
            }  
        });
        return headerReturn
    };
    
    function buildCells(gridColumns, data) {
        var rowsReturn = [];
    
        gridColumns.forEach(((field) => {
            if (!parentFieldName || parentFieldName.search(field.fieldId) < 0) {
                const value = data[field.fieldId]
                const newValue = (typeof value === 'number') ? value.toString() : value;
                rowsReturn.push( { type: "text", text: newValue } )
            }
        }))
        return rowsReturn;
    };
    
    const getColumns = () => 
    {
        var columnsReturn = [];

        gridColumns.forEach((field)  => {
            if (!parentFieldName || parentFieldName.search(field.fieldId) < 0) {
                columnsReturn.push( { columnId: field.fieldId, width: field.width, resizable: true } );
            }
        })
        return columnsReturn;
    };

    const headerRow = {
        rowId: "header",
        cells: buildHeader(gridColumns)
    };

    const getRows = (data) => [
        headerRow,
        ...data.map((data, idx) => ({
          rowId: idx,
          cells: buildCells(gridColumns, data)
        }))
    ];



    function GridData() {
        const [rows, setRows] = useState(getRows(dadosDataGrid));
        const [columns, setColumns] = useState(getColumns());

        var selectRow;

        const {cadastrarDados} = usePost();
        const {alterarDados} = usePut();
        const {excluirDados} = useDelete();
        
        const applyChangesToData = (
            changes,
            prevData
        ) => {
            changes.forEach((change) => {
                const dataIndex = change.rowId;
                const fieldName = change.columnId;

                prevData[dataIndex][fieldName] = change.newCell.text;
            });
            return [...prevData];
        };

        function handleAdd() {
            // Montar um novo JSON baseado na classe da estrutura
            const novoRegistro = {};
            novoRegistro["id"] = 0;
            gridColumns.forEach((field) => {
                if (field.fieldId === parentFieldName) {
                    novoRegistro[field.fieldId] = parentId;
                } else {
                    novoRegistro[field.fieldId] = "";
                }
            });

            dadosDataGrid.push(novoRegistro);

            setRows(getRows(dadosDataGrid)); 
        };

        function handleSave() {
            try {
                dadosDataGrid.forEach((dataInterface) => {
                    
                    if (!dataInterface.id) {
                        const dadosRespost = cadastrarDados({url: endPoint, dados: dataInterface});
                        dadosRespost.then((dados) => {
                            dataInterface.id = dados.id;
                        });
                        //alert('Registro cadastrado');
                    } else {
                        alterarDados({url: `${endPoint}/${dataInterface.id}`, dados: dataInterface});
                        //alert('Registro alterado'); 
                    };
                });
                alert('Registro Cadastrado');
        
            } catch (erro) {
                erro && alert('Erro ao cadastrar os dados');
            };
        };

        function handleEdit() {
            alert("Edit não implementado")
        };
        
        function handleDelete() {
            if (selectRow) {
                try {
                    const dataInterface = dadosDataGrid[selectRow];

                    if (dataInterface.id) {
                        excluirDados({url: `${endPoint}/${dataInterface.id}`})
                        dadosDataGrid.splice(selectRow, 1);
                        setRows(getRows(dadosDataGrid));
                    } 
                    alert('Registro excluído');
                } catch (erro) {
                    erro && alert('Erro ao excluir os dados');
                };

            };
        };

        const handleColumnResize = (ci, width) => {
            setColumns((prevColumns) => {
                const columnIndex = prevColumns.findIndex(el => el.columnId === ci);
                const resizedColumn = prevColumns[columnIndex];
                const updatedColumn = { ...resizedColumn, width };
                prevColumns[columnIndex] = updatedColumn;
                return [...prevColumns];
            });
        };
    
        const handleSelectionChange = (selectedCell) => {
            selectRow = selectedCell.rowId;
        };

        const handleChanges = (changes) => { 
            setRows(getRows(applyChangesToData(changes, dadosDataGrid))); 
        }; 

        return (
            <>
            { editavel ? (
                <GridHeader>
                    <GridBotao src={icone_add}    onClick={handleAdd}/>
                    <GridBotao src={icone_edit}   onClick={handleEdit}/>
                    <GridBotao src={icone_save}   onClick={handleSave}/>
                    <GridBotao src={icone_delete} onClick={handleDelete}/>
                </GridHeader> 
                ) : ( <></> )
            }
                <ReactGrid 
                    rows={rows} 
                    columns={columns} 
                    onColumnResized={handleColumnResize} 
                    enableFullWidthHeader 
                    enableRowSelection 
                    onCellsChanged={handleChanges} 
                    onFocusLocationChanged={handleSelectionChange}
                />
            </>
        );
    }

    return (
        <>
            <GridDiv>
                <GridData />
            </GridDiv>
        </>
    )
}