import Error from 'next/error';
import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ArtworkCard({ objectID }) {
  //fetch artwork data
  const { data, isLoading, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
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
              <p>
                <span className="fw-bold">Date:</span>{' '}
                {data?.objectDate || 'N/A'}
              </p>
              <p>
                <span className="fw-bold">Classification:</span>{' '}
                {data?.classification || 'N/A'}
              </p>
              <p>
                <span className="fw-bold">Medium: </span>
                {data?.medium || 'N/A'}
              </p>
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
  //fetch artwork data
  const { data, isLoading, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
    fetcher
  );

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
              <p>
                <span className="fw-bold">Date: </span>
                {data?.objectDate || 'N/A'}
              </p>
              <p>
                <span className="fw-bold">Classification:</span>{' '}
                {data?.classification || 'N/A'}
              </p>
              <p>
                <span className="fw-bold">Medium:</span> {data?.medium || 'N/A'}
              </p>
              <br />
              <br />
              <p>
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
              </p>
              {/* <p>
                {data?.artistDisplayName && data?.artistWikidata_URL ? (
                  <a
                    href={data?.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Wiki
                  </a>
                ) : (
                  ''
                )}
              </p> */}
              <p>
                <span className="fw-bold">Credit Line: </span>
                {data?.creditLine || 'N/A'}
              </p>
              <p>
                <span className="fw-bold">Dimensions:</span>{' '}
                {data?.dimensions || 'N/A'}
              </p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
}
