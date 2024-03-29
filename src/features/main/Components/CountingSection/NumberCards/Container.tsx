import useNumberCards from "features/main/hooks/useNumberCards";
import { Card, Comma, Container } from "./Container.style";

interface NumberCardsProps {
  minNumberOfDigits: number;
  number: number;
  upperColor: string;
}

const NumberCards = (props: NumberCardsProps) => {
  const { numberArrayWithComma } = useNumberCards({
    number: props.number,
    minNumberOfDigits: props.minNumberOfDigits,
  });

  return (
    <Container>
      {numberArrayWithComma.map((value, index) =>
        value === "," ? (
          <Comma key={index}>,</Comma>
        ) : (
          <Card key={index} upperColor={props.upperColor}>
            {value}
          </Card>
        )
      )}
    </Container>
  );
};

export default NumberCards;
