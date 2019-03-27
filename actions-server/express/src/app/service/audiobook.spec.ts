import axios from 'axios';
import { getState, Eaudiobook, getMedia } from './audiobook.service';

jest.mock('axios');

it('fake test', async () => {
  expect(getState(Eaudiobook.OK)).toEqual(getState(Eaudiobook.OK));
});

it('get media number neg', async () => {
  (axios.get as jest.Mock).mockImplementationOnce(() => 
    Promise.resolve({
      data: { }
    })
  );

  expect(await getMedia("", 0, undefined, -1)).toEqual(getState(Eaudiobook.NOT_FOUND));
});

it('get media number too high', async () => {
  (axios.get as jest.Mock).mockImplementationOnce(() => 
    Promise.resolve({
      data: { }
    })
  );

  expect(await getMedia("", 0, undefined, 4)).toEqual(getState(Eaudiobook.NOT_FOUND));
});