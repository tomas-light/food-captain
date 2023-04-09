import { Container } from 'cheap-di';
import { FC, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppNavigator } from './AppNavigator';

export const RegisterNavigationInDI: FC<{ container: Container }> = (props) => {
  const { container } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const navigatorRef = useRef({ navigate, location });

  // actualize function on each rerender
  navigatorRef.current.navigate = navigate;
  navigatorRef.current.location = location;

  useState(() => {
    const navigator = new AppNavigator(() => navigatorRef.current);
    container.registerInstance(navigator);
  });

  return null;
};
