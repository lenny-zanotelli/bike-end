import { Alert, AlertColor, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setDisplaySnackbar } from '../../store/reducers/login';

function AlertMessage() {
  const dispatch = useAppDispatch();
  const { open, severity, message } = useAppSelector((state) => state.login.alert);
  return (
    <Snackbar
      autoHideDuration={2500}
      open={open}
      onClose={() => dispatch(setDisplaySnackbar({ severity, message }))}
    >
      <Alert
        severity={severity as AlertColor}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
