import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';
import { useRouter } from 'next/router';
import { Card, ListGroup, Button } from 'react-bootstrap';
import styles from '@/styles/History.module.css';
import { removeFromHistory } from '@/lib/userData';

export default function History() {
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const router = useRouter();
  if (!searchHistory) return null;

  let parsedHistory = searchHistory.map((item) => {
    let params = new URLSearchParams(item);
    let entries = params.entries();
    return Object.fromEntries(entries);
  });

  function historyClicked(e, idx) {
    router.push(`/artwork?${searchHistory[idx]}`);
  }

  async function removeHistoryClicked(e, idx) {
    e.stopPropagation();
    // setSearchHistory((current) => {
    //   let x = [...current];
    //   x.splice(idx, 1);
    //   return x;
    // });
    setSearchHistory(await removeFromHistory(searchHistory[idx]));
  }

  return (
    <>
      {parsedHistory.length ? (
        <ListGroup>
          {parsedHistory.map((historyItem, idx) => {
            return (
              <ListGroup.Item
                variant="light"
                onClick={(e) => historyClicked(e, idx)}
                className={styles.historyListItem}
                key={idx}
              >
                {Object.keys(historyItem).map((key) => (
                  <span>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </span>
                ))}
                <Button
                  className="float-end"
                  variant="danger"
                  size="sm"
                  onClick={(e) => removeHistoryClicked(e, idx)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <Card.Title>Nothing Here</Card.Title>
            <Card.Text>Try searching for some artwork</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
