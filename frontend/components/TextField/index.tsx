import { TextField as TextFieldMaterial, Theme } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import { TextFieldProps } from "@material-ui/core/TextField";

const useStyle = makeStyles(({ palette, spacing, props, shape }: Theme) =>
  createStyles({
    registerContainer: {},
    googleSignUpContainer: {
      height: "12em"
    },
    buttonGoogleIcon: {
      width: 150,
      background: "white"
    },
    googleIcon: {
      marginRight: spacing(1)
    },
    signUpTypography: {
      marginBottom: "10px"
    },
    formContainer: {
      minHeight: "22em",
      padding: "20px 0",
      backgroundColor: "#F8F8F8",
      borderBottomLeftRadius: shape.borderRadius,
      borderBottomRightRadius: shape.borderRadius
    },
    textField: {
      width: 350,
      marginBottom: 10,
      "& label.Mui-focused": {
        // color: 'green',
        // border: '1px solid'
      },
      "& .MuiInput-underline:after": {
        // borderBottomColor: 'green',
        borderBottom: "1px solid"
        // border: 'none'
      },
      "& .MuiOutlinedInput-root": {
        backgroundColor: "white",
        "& fieldset": {
          borderColor: "transparent",
          // border: 'none',
          boxShadow: "0px 2px 4px -1px rgba(0,0,0,.3)"
        },
        "&:hover fieldset": {
          // borderColor: 'yellow',
        },
        "&.Mui-focused fieldset": {
          borderColor: palette.primary.main,
          border: "1px solid"
        },
        "& .MuiOutlinedInput-root:invalid + fieldset": {
          borderColor: "blue",
          borderWidth: 2
        }
      }
    }
  })
);

type Props = {
  errors: {
    hasError: boolean;
    message: string | boolean;
  };
  theme?: Theme;
};

const TextField = ({ errors, ...props }: Props & TextFieldProps) => {
  const classes = useStyle(props.theme);
  return (
    <TextFieldMaterial
      id={props.id ? props.id : name}
      className={classes.textField}
      margin={props.margin ? props.margin : "normal"}
      // variant={'outlined'}
      error={errors.hasError}
      helperText={errors.message}
      {...props}
    />
  );
};

export default TextField;
