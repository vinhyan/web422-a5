import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '@/store';

export default function AdvancedSearch() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      q: '',
      searchBy: 'title',
      geoLocation: '',
      medium: '',
      isHighlight: false,
      isOnView: false,
    },
  });

  function submitForm(data) {
    // console.log(data);

    const queryString = `${data.searchBy}=true${
      data.geoLocation ? `&geoLocation=${data.geoLocation}` : ''
    }${data.medium ? `&medium=${data.medium}` : ''}&isHighlight=${
      data.isHighlight
    }&isOnView=${data.isOnView}&q=${data.q}`;

    // Add search query to search history
    setSearchHistory([...searchHistory, queryString]);

    // console.log(queryString);

    //change route with the query string using router.push()
    router.push(`/artwork?${queryString}`);
  }
  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder=""
                name="q"
                {...register('q', { required: true })}
                isInvalid={!!errors.q}
              />
              <Form.Control.Feedback type="invalid">
                {errors.q && errors.q.type === 'required' && (
                  <span>This is required</span>
                )}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Label>Search By</Form.Label>
          <Form.Select
            name="searchBy"
            className="mb-3"
            {...register('searchBy')}
          >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
            <option value="artistOrCulture">Artist or Culture</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="geoLocation"
              {...register('geoLocation')}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;,
              &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.),
              with multiple values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              name="medium"
              {...register('medium')}
            />
            <Form.Text className="text-muted">
              Case Sensitive String (ie: &quot;Ceramics&quot;,
              &quot;Furniture&quot;, &quot;Paintings&quot;,
              &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple
              values separated by the | operator
            </Form.Text>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Check
            type="checkbox"
            label="Highlighted"
            name="isHighlight"
            {...register('isHighlight')}
          />
          <Form.Check
            type="checkbox"
            label="Currently on View"
            name="isOnView"
            {...register('isOnView')}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <br />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
