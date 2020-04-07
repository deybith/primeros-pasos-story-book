import React from 'react';

// @material
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

// material icons
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    display: "inline-block",
    color: "#00acc1",
    fontWeight: 400,
  },
  buttonDelete: {
    display: "inline-block",
    fontWeight: 400,
    color: 'red'
  },
  buttonShow: {
    display: "inline-block",
    fontWeight: 400,
    color: "#ff9800"
  },
  actions1:{
    width: 48,
  },
  actions2:{
    width: 48*2,
  },
  actions3:{
    width: 48*3,
  },
});


const RowComponent: React.FC = ({ name, className = '', isPrimary = false, actions = {}, rowBody = {}, showInTable = true, onSearch, onEdit, onDelete }) => {
  const classes = useStyles();

  //actions logic
  return <React.Fragment>
    {(!!Object.keys(actions).length && isPrimary) && <TableCell align="right" component="th" scope="row" className={className}>
      <div className={classes[`actions${Object.keys(actions).length}`]}>
        {actions.show && <IconButton className={classes.buttonShow} onClick={() => {
            if (onSearch) onSearch(rowBody[name])
            else throw new Error('onSearch prop is required in Yii2DataProvider Component!');
          }
          } > <SearchIcon /> </IconButton>}
          {actions.edit && <IconButton className={classes.button} onClick={() => {
            if (onEdit) onEdit(rowBody[name])
            else throw new Error('onEdit prop is required in Yii2DataProvider Component!');
          }
          } > <EditIcon /> </IconButton>}
          {actions.delete && <IconButton className={classes.buttonDelete} onClick={() => {
            onDelete(rowBody[name])
          }
          } > <DeleteOutlineIcon /> </IconButton>}
      </div>
      </TableCell>}
    {showInTable && <TableCell className={className}>{rowBody[name]}</TableCell> }
  </React.Fragment>
}

const Yii2TableBody: React.FC = ({ items, columnsHeader, pagination = null, showPaginationTop = false, actions = {}, onSearch, onEdit, onDelete, className = '', actionsLabel = 'Actions' }) => {

  const classes = useStyles();
  return (
    <div>
      <TableContainer className={className} component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            {showPaginationTop && <TableRow>{pagination}</TableRow>}
            <TableRow>

              {!!Object.keys(actions).length && <TableCell >{actionsLabel}</TableCell>}

              {columnsHeader.map((rowHeader, idHeader : number) => {

                  // fields not showed
                  if (!rowHeader.showInTable) {
                    return null;
                  }

                  // show fields
                  return ((rowHeader.isPrimary || rowHeader.number) ? 
                    <TableCell align="right" key={"rowHeader" + idHeader}>{rowHeader.label}</TableCell> :
                    <TableCell key={idHeader}>{rowHeader.label}</TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((rowBody, idBody : number) => (
              <TableRow key={idBody} {...rowBody}>
                {columnsHeader.map((rowColumn, id: number) => (
                  <RowComponent 
                    key={"rowColumn" + id}
                    {...rowColumn}
                    actions={actions}
                    rowBody={rowBody}
                    onSearch={onSearch}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </TableRow>
            ))}
            {!showPaginationTop && <TableRow>{pagination}</TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Yii2TableBody;