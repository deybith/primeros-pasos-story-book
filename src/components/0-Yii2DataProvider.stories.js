import React from 'react';

//Storybook
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs";

//components
import Yii2DataProvider from './Yii2DataProvider';

export default {
  title: "Yii2 Data Provider",
  component: Yii2DataProvider,
  decorators: [withKnobs]
};

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