import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Error } from 'next/error';
import { Row, Col, Pagination } from 'react-bootstrap';
import { ArtworkCard } from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const [artworkList, setArtworkList] = useState();
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];
  //   let finalQuery = 'q=sunflowers';

  const { data, isLoading, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      let results = [];
      let filteredResults = validObjectIDList.objectIDs.filter((objectID) =>
        data.objectIDs?.includes(objectID)
      );
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  if (error) {
    return <Error statusCode={404} />;
  }

  function previousPage() {
    page > 1 ? setPage(page - 1) : setPage(1);
  }

  function nextPage() {
    page < artworkList.length ? setPage(page + 1) : setPage(artworkList.length);
  }
  return (
    <>
      {artworkList ? (
        <ArtworkList
          artworkList={artworkList}
          page={page}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      ) : null}
    </>
  );
}

function ArtworkList({ artworkList, page, nextPage, previousPage }) {
  return (
    <>
      <Row className="gy-4">
        {artworkList.length > 0 ? (
          artworkList[page - 1].map((artwork) => (
            <Col lg={3} key={artwork}>
              <ArtworkCard objectID={artwork} />
            </Col>
          ))
        ) : (
          <h4>Nothing Here</h4>
        )}
      </Row>
      {artworkList.length > 0 ? (
        <Row>
          <Col>
            {' '}
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      ) : (
        ''
      )}
    </>
  );
}
