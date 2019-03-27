import { Session } from './session';

it('session cycle', async () => {

    let session = new Session();
    await session.waitInit;
    session.user = {
      lastseen: new Date(Date.now()),
      name: "fake test",
    };
    await session.set();

    let session2 = new Session(session.id);
    await session2.waitInit;

    await session.del();
    expect(JSON.parse(JSON.stringify(session))).toEqual(JSON.parse(JSON.stringify(session2)));

});