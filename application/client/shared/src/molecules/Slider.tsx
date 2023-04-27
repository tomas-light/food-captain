import {
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useToggler } from '../hooks';

type Props = {
  max: number;
  value: number | undefined;
  onChange: (newValue: number) => void;
};

export const Slider: FC<Props> = (props) => {
  const { max, value, onChange } = props;

  const [showTooltip, setShowTooltip] = useToggler();

  return (
    <ChakraSlider
      value={value ?? max}
      min={0}
      max={max}
      onChange={onChange}
      onMouseEnter={setShowTooltip.on}
      onMouseLeave={setShowTooltip.off}
    >
      <SliderMark value={0} marginTop="1" left={0} fontSize="sm">
        0
      </SliderMark>
      <SliderMark
        value={max}
        marginTop="1"
        left={'unset !important'} // try to override chakra left style
        right={0}
        fontSize="sm"
      >
        {max}
      </SliderMark>

      <SliderTrack>
        <SliderFilledTrack bgColor={'secondary.main'} />
      </SliderTrack>

      <Tooltip
        hasArrow
        bg="secondary.main"
        color="white"
        placement="bottom"
        isOpen={showTooltip}
        label={value}
      >
        <SliderThumb />
      </Tooltip>
    </ChakraSlider>
  );
};
