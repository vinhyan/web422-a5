import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { ArtworkCard } from '@/components/ArtworkCard';
import { Row, Col, Card } from 'react-bootstrap';

export default function Favourites() {
  const [favouritesList, setFavourtiesList] = useAtom(favouritesAtom);
  return (
    <>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((artwork) => (
            <Col lg={3} key={artwork}>
              <ArtworkCard objectID={artwork} />
            </Col>
          ))
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>Nothing Here</Card.Title>
              <Card.Text>Try adding some new artwork to the list</Card.Text>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
}
