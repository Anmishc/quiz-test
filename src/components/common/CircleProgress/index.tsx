import styled from 'styled-components';
import { Trans } from 'react-i18next';

const CircleProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div.attrs<{ $progress: number }>((props) => ({
  style: {
    background: `conic-gradient(#E4229C ${props.$progress * 3.6}deg, #ffffff ${props.$progress * 3.6}deg 360deg)`,
  },
}))<{ $progress: number }>`
  width: 252px;
  height: 252px;
  border-radius: 50%;
  position: relative;
  transition: background 0.5s ease;
`;

const InsideCircle = styled.div`
  width: 90%;
  height: 90%;
  border-radius: 50%;
  background: #1F002B;
  position: absolute;
  top: 5%;
  left: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  text-align: center;
  color: #ffffff;
`;

const ProgressText = styled.div`
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 600;
  line-height: 25px;
  letter-spacing: -0.01em;
  text-align: center;
  margin-top: 50px;
  max-width: 213px;
`;

interface CircleProgressProps {
  text: string;
  progress: number;
}

function CircleProgress({ text, progress }: CircleProgressProps) {
  return (
    <CircleProgressWrapper>
      <Circle $progress={progress}>
        <InsideCircle>
          {progress.toFixed()}
          %
        </InsideCircle>
      </Circle>
      <ProgressText>
        <Trans i18nKey="loader.text">
          {text}
        </Trans>
      </ProgressText>
    </CircleProgressWrapper>
  );
}

export default CircleProgress;
