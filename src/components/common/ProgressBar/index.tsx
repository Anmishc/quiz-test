import styled from 'styled-components';

const ProgressBarWrapper = styled.div`
  width: 100%;
  background-color: #e8eaf2;
  border-radius: 4px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 4px;
  border-radius: 4px;
  background-color: #e4229c;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease-in-out;
`;

interface ProgressBarProps {
  current: number;
  total: number;
}

function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <ProgressBarWrapper>
      <ProgressFill $progress={progress} />
    </ProgressBarWrapper>
  );
}

export default ProgressBar;
