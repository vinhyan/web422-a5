import Error from 'next/error';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import { useState, useEffect } from 'react';
import { addToFavourites, addToHistory, removeFromFavourites } from '@/lib/userData';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ArtworkCard({ objectID }) {
  //fetch artwork data
  const { data, isLoading, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  if (error) return <Error statusCode={404} />;
  if (isLoading) return <div>Loading...</div>;

  if (data)
    return (
      <>
        <Card>
          <Card.Img
            variant="top"
            src={
              data?.primaryImageSmall ||
              `https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d`
            }
          />
          <Card.Body>
            <Card.Title>{data?.title}</Card.Title>
            <Card.Text>
              <span className="fw-bold">Date:</span> {data?.objectDate || 'N/A'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Classification:</span>{' '}
              {data?.classification || 'N/A'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Medium: </span>
              {data?.medium || 'N/A'}
            </Card.Text>

            <Link href={`/artwork/${data?.objectID}`} passHref>
              <Button variant="primary">ID: {data?.objectID}</Button>
            </Link>
          </Card.Body>
        </Card>
      </>
    );
}

export function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setfavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  //fetch artwork data
  const { data, isLoading, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null,
    fetcher
  );

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  async function favouritesClicked() {
    if (showAdded) {
      setfavouritesList(await removeFromFavourites(objectID))
      // setfavouritesList((current) => current.filter((fav) => fav !== objectID));
      // setShowAdded(false);
    } else {
      setfavouritesList(await addToFavourites(objectID));
      // setfavouritesList((current) => [...current, objectID]);
      // setShowAdded(true);
    }
  }

  // console.log('favouritesList', favouritesList);

  if (error) return <Error statusCode={404} />;
  if (isLoading) return <div>Loading...</div>;
  if (data)
    return (
      <>
        <Card>
          {data?.primaryImage ? (
            <Card.Img variant="top" src={data?.primaryImage} />
          ) : (
            ''
          )}

          <Card.Body>
            <Card.Title className="py-3">{data?.title}</Card.Title>
            <Card.Text>
              <span className="fw-bold">Date: </span>
              {data?.objectDate || 'N/A'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Classification:</span>{' '}
              {data?.classification || 'N/A'}
            </Card.Text>
            <span className="fw-bold">Medium:</span> {data?.medium || 'N/A'}
            <br />
            <br />
            <Card.Text>
              <span className="fw-bold">Artist:</span>{' '}
              {(
                <a
                  href={data?.artistWikidata_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data?.artistDisplayName}
                </a>
              ) || 'N/A'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Credit Line: </span>
              {data?.creditLine || 'N/A'}
            </Card.Text>
            <Card.Text>
              <span className="fw-bold">Dimensions:</span>{' '}
              {data?.dimensions || 'N/A'}
            </Card.Text>
            <Button
              variant={showAdded ? 'primary' : 'outline-primary'}
              onClick={favouritesClicked}
            >
              + Favourite {showAdded ? '(added)' : ''}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
}
