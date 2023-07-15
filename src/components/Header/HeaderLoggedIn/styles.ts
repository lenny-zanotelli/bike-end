/* eslint-disable import/prefer-default-export */
export const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center',
    my: '0.5rem',
    '@media screen and (min-width : 900px)': {
      display: 'flex',
      gap: '8rem',
      alignItems: 'center',
      textAlign: 'center',
      width: '100vw',
      height: '5rem',
      px: '3rem',
      m: '0',
      marginBottom: '1rem',
      background: '#D1EFEC',
    },
  },
  headerTitleTagline: {
    display: 'none',
    '@media screen and (min-width : 900px)': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  headerTagline: {
    '@media screen and (min-width: 900px)': {
      paddingLeft: '0.7rem',
      fontSize: '1.25rem',
    },
  },
  headerTitle: {
    fontSize: '2rem',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  headerContainerRightIcons: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
    '@media screen and (min-width: 900px)': {
      width: 'auto',
    },
  },
};
