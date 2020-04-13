# Import

```sh
    import { Yii2DataProvider } from 'react-yii-tools';
```

# Example

```sh
    import React from 'react';

    //components
    import { Yii2DataProvider } from 'react-yii-tools';

    const createColumnsHeader = (name, label, number = false, isPrimary = false, showInTable = true, filter = true, rest) => {
        return {
            name,
            label,
            number,
            filter,
            isPrimary,
            showInTable,
            ...rest
        }
    }

    const columnsHeader = [
        createColumnsHeader('id', 'Id', true, true, false, true),
        createColumnsHeader('name', 'Name', true),
        createColumnsHeader('surname', 'Surname', false),
    ];

    export const Table = () => <Yii2DataProvider 
        api={{
            url:'https://localhost/yii2/web/api',
            headers: { 
                'Authorization': 'Bearer jwtToken'
            }
        }}
        actions={{
            show: '/show',
            delete: true,
            edit: '/edit'
        }}
        onSearch={action('search')}
        onEdit={action('edit')}
        //onDelete={action('delete')}
        filters={false}
        showPaginationTop
        pagination={{
            labelRowsPerPage: 'Filas por página:'
        }}
        actionsLabel='Acciones'
        advancedFiltersLabel="Mostrar/Ocultar filtros"
        columnsHeader={columnsHeader}
        onClick={action('clicked')}
    />;
```

# Props

| Name | Type | Description |
|------|------|-------------|
| api  | json  | Data for fetch request, url attribute is required |
| actions  | json  | Active actions, show and edit  attribute need end point for redirect, delete is boolean |
| onSearch  | func | callback function with row id param |
| onEdit  | func  | callback function with row id param |
| filters  | bool | Show advance filters |
| showPaginationTop  | bool | put paginations in top of table |
| pagination  | json  | labelRowsPerPage attribute, label rows per page |
| actionsLabel  | string  | Actions Label for column header |
| advancedFiltersLabel  | string  | Advanced filters label |
| columnsHeader  | json  | { name, label, number, filter, isPrimary, showInTable, ...rest	} |