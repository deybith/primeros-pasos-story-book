import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Switch from "@material-ui/core/Switch";
import Checkbox from "@material-ui/core/Checkbox";

import MuiAlert from '@material-ui/lab/Alert';

//icons
import InputAdornment from "@material-ui/core/InputAdornment";
import Check from "@material-ui/icons/Check";

// core components
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Datetime from "react-datetime";

//other components
import Select from 'react-select';

const styles = {

}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ErrorMessage = (props) => {
    if (props.errorMessage === undefined)
        return null;

    return <div className={props.className}> {props.errorMessage} </div>
}

class BuildForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSimple = (event, row) => {

        let value = event.target.value;
        value = String(value);
        this.parentSetState(event.target.id, value, row.type);
    }

    handleSimpleDatePicker = name => (event) => {
        this.parentSetState(name, event.format("DD/MM/YYYY"), 'date');
    }

    handleSimpleSelect = name => (value: string) => {
        this.parentSetState(name, value, 'dropdown');
    }

    handleSimpleCheckRadio = (name, value) => {
        value = value ? "1" : "0";
        this.parentSetState(name, value, 'radio');
    }

    handleToggle = (name, value) => {
        let state = this.props.state || {};
        let checked = state[name] || [];
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.parentSetState(name, newChecked, 'check');
    }

    parentSetState(name, value, type) {
        this.props.parentSetState(name, value, type);
    }

    isValidated() {
        return true;
    }


    render() {
        const { classes, fields } = this.props;
        
        let state = this.props.state || {};
        let stateTab = this.props.stateTab || {};

        return (
            <Grid container className={this.props.className} spacing={3} >
                {fields.map(row => {
                    let action = state[row.name + "Action"];
                    if (action === 'hide' || (row.showIsNotEmpty && !state[row.name]) ) {
                        return null;
                    }

                    let readonly = false;

                    if (action === "readonly" || row.type == 'readonly' || stateTab.readonly ) {
                        readonly = true;    
                    }

                    switch (row.type) {
                        case "radio":
                            //buil radio
                            let check = !(state[row.name] == 0 || !state[row.name]) ? true : false;
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <FormControlLabel
                                    className={classes.switch}
                                    control={
                                        <Switch
                                            checked={check}
                                            onChange={ event => readonly || this.handleSimpleCheckRadio(row.name, event.target.checked)}
                                            value="1"
                                            classes={{
                                                switchBase: classes.switchBase,
                                                checked: classes.switchChecked,
                                                thumb: classes.switchIcon,
                                                track: classes.switchBar
                                            }}
                                        />
                                    }
                                    classes={{
                                        label: classes.label
                                    }}
                                    label={row.label}
                                />
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>
                        //final buil
                        case "check":
                            //buil radio
                            let checkOptions = state[row.name + "List"] || row.options;
                            let checked =  state[row.name] || [];
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.checkLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                {checkOptions.map(rowOptions =>
                                    <FormControlLabel key={row.name + rowOptions.value}
                                        className={classes.labelBlock}
                                        control={
                                            <Checkbox
                                                tabIndex={-1}
                                                onClick={() => readonly || this.handleToggle(row.name, rowOptions.value)}
                                                checkedIcon={<Check className={classes.checkedIcon} />}
                                                checked={checked.includes(rowOptions.value)}
                                                icon={<Check className={classes.uncheckedIcon} />}
                                                classes={{
                                                    checked: classes.checked,
                                                    root: classes.checkRoot
                                                }}
                                            />
                                        }
                                        classes={{
                                            label: classes.label,
                                            root: classes.labelRoot
                                        }}
                                        label={rowOptions.label}
                                    />
                                )
                                }
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>
                        //final buil
                        case "alert":
                            //buil radio
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6} className={classes.mt} p={2}>
                                <Alert severity={row.color}>{state[row.name + "Message"] || row.message}</Alert>
                            </Grid>
                        //final buil
                        case "dropdown":
                            // build dropdownlist
                            let options = state[row.name+"List"] || row.options;
                            let valueoption = [];
                            if (state[row.name] && typeof state[row.name] === 'object') {
                                valueoption = options.filter(option => option.value == (state[row.name].value));
                            } else if (state[row.name]) {
                                valueoption = options.filter(option => option.value == (state[row.name]));
                            }

                            if ( options.length == 0 ) {
                                return null;
                            }

                            return <Grid item key={"_"+row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                <Select
                                    value={valueoption}
                                    nonce={this.props.nonce}
                                    options={options}
                                    placeholder="...Seleccione uno"
                                    onChange={(event) => readonly || this.handleSimpleSelect(row.name)(event)}
                                />
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>
                        //final buil
                        case "datepicker":
                            // build dropdownlist
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <InputLabel
                                    htmlFor="simple-select"
                                    className={classes.selectLabel}
                                >
                                    {row.label}
                                    <strong className={classes.dangerText}>{!row.required || " *"}</strong>
                                </InputLabel>
                                <FormControl fullWidth>
                                    {(
                                        row.icon ? <InputAdornment
                                            position="end"
                                            className={classes.inputAdornment}
                                        >
                                            <row.icon className={classes.inputAdornmentIcon} />
                                        </InputAdornment> : null
                                    )}
                                    <Datetime
                                        value={state[row.name] || ""}
                                        inputProps={{readOnly:true}}
                                        timeFormat={row.timeFormat}
                                        dateFormat={row.dateFormat}
                                        onChange={ event => readonly || this.handleSimpleDatePicker(row.name)(event)}
                                    />
                                </FormControl>
                                <ErrorMessage
                                    errorMessage={state[ row.name + "ErrorMessage" ]}
                                    className={classes.dangerText}
                                />
                            </Grid>
                        //final buil
                        case "separator":
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={12}>
                                    <h4><row.icon /> {row.label}</h4>
                                    </Grid>
                        case "text":
                        case "number":
                        case "email":
                        case "miles":
                        case "decimal":
                        default:
                            // build field text
                            let value = state[row.name] || '';
                            value = typeof value === 'object' ? value.label : value;
                            
                            return <Grid item key={"_" + row.name} xs={12} sm={12} md={row.fullWidth ? 12 : 6}>
                                <TextField
                                    id={row.name}
                                    label={row.label}
                                    value={state[row.name] || ""}
                                    onChange={(event) => readonly || this.handleSimple(event, row)}
                                    fullWidth
                                />
                                <ErrorMessage
                                    errorMessage={state[row.name + "ErrorMessage"]}
                                    className={classes.dangerText}
                                />
                            </Grid>
                        }
                    })
                }
            </Grid>
        );
    }

}

BuildForm.defaultProps = {
    fields: [],
    parentSetState: (e) => console.log("required")
}

// reglas
BuildForm.propTypes = {
    classes: PropTypes.object,
    classes: PropTypes.object
};

export default withStyles(styles)(BuildForm);
