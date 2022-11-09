import React, { useState } from "react";
import { useEffect } from "react";
import SearchResults from './SearchResults';
import { Button, Heading, Input, Text, Table, Thead, Tr, Th, Tbody } from '@chakra-ui/react';

export const fetchData = async () => {
  try {
    let res = await fetch(`https://6098f0d799011f001713fbf3.mockapi.io/techcurators/products/flights/1`);
    res = await res.json();
    return res;
  } catch (err) {
    console.log(err);
  }
};

function FlightSearch() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('');
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    fetchData()
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(data)

  const hadleChange = (e) => {
    const { value, placeholder } = e.target;
    setState({ ...state, [placeholder]: value })
  };

  const handleSearch = () => {
    const { Source, Destination } = state;
    let p = data.filter((ele) => {
      return ele.source === Source && ele.destination === Destination;
    });
    setFilter(p);
  };
  // console.log(filter)
  return (
    <div>
      <div>
        <section>
          <Heading color={"green"}>Flight Search</Heading>
          <br />
          <Input w={"50%"} data-testid="source-input" placeholder="Source" onChange={hadleChange} />
          <br /> <br />
          <Input w={"50%"} data-testid="destination-input" placeholder="Destination" onChange={hadleChange} />
          <br /> <br />
          <Button onClick={handleSearch} data-testid="search-button">Search</Button>
        </section>
      </div>
      {state === '' || filter.length === 0 ? <Text color={"red"}>No Flights Found</Text> :
        <Table border={"1px solid red"} mt="5%">
          <Thead>
            <Tr>
              <Th color={"green"} fontSize="21px">SOURCE</Th>
              <Th color={"green"} fontSize="21px">DESTINATION</Th>
              <Th color={"green"} fontSize="21px">DEPARTURE</Th>
              <Th color={"green"} fontSize="21px">DURATION</Th>
              <Th color={"green"} fontSize="21px">ARRIVAL</Th>
              <Th color={"green"} fontSize="21px">PRICE</Th>
            </Tr>
          </Thead>
          <Tbody data-testid="flight-results">
            {filter.map((ele, index) =>
              <SearchResults key={index} departure={ele.departure} duration={ele.duration} arrival={ele.arrival} price={ele.price} destination={ele.destination} source={ele.source} />
            )}
          </Tbody>
        </Table>
      }
    </div>
  );
}

export default FlightSearch;
