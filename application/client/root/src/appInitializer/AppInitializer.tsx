import { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Icon, Typography, Fade } from '@food-captain/client-shared';
import { useSelector } from '~/config/redux/useSelector';
import { AppInitializerController } from './redux';
import classes from './AppInitializer.module.scss';

type Props = {
  children: ReactElement;
};

export const AppInitializer: FC<Props> = (props) => {
  const { children } = props;
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.appInitializer);

  useEffect(() => {
    if (!initialized) {
      dispatch(AppInitializerController.initialize());
    }
  }, [initialized]);

  console.log('AppInitializer initialized', initialized);

  if (!initialized) {
    return (
      <Fade isOpen={true}>
        <div className={classes.initialScreen}>
          <div className={classes.logoContainer}>
            <Icon variant={'logo'} />
          </div>

          <Typography size={20}>Loading...</Typography>
        </div>
      </Fade>
    );
  }

  return <>{children}</>;
};
