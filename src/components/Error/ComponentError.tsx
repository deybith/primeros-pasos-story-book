import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default function ComponentError({error}) {

    const classes = useStyles();

    return <Alert severity="error">
            <AlertTitle>The component cannot loaded!!</AlertTitle>
            Error {error}
        </Alert>
}