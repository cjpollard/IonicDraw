import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { setBaseTestProviders } from 'angular2/testing';
import { SqlStorage } from 'ionic-angular';
import { DataService } from './data.service';
import { Note } from '../note';

let service = null;
let returnObject = {
  res: {
    rows: {
      length: 1,
      item: (num: number) => {
        return {
          id: 1,
          title: "title",
          note: "note",
          type: "note"
        };
      }
    },
  }
};

function mockSqlQuery(query: string): Promise<{}> {
    return new Promise((resolve: Function) => {
      resolve(returnObject);
    });
}

let mockSqlStorage = {
  query: mockSqlQuery
};

export function main() {

  describe('DataService', () => {

    beforeEach(function() {
      spyOn(DataService, 'initStorage').and.returnValue(mockSqlStorage);
      service = new DataService();
      spyOn(service['storage'], 'query').and.callFake(mockSqlQuery);
    });

    it('has some storage', () => {
      expect((<any>DataService).initStorage()).toEqual(mockSqlStorage);
      expect(service['storage']).toEqual(mockSqlStorage);
    });

    it('initDb creates a new table', (done: Function) => {
      service.initDb();
      expect(service['storage'].query).toHaveBeenCalled();
      service['storage'].query().then(() => {
        expect(service['notes']).toEqual([]);
        done();
      });
    });

    it('getNotes returns some notes', (done: Function) => {
      service.getNotes("note", (notes) => {
        expect(service['notes']).toEqual([{id: 1, title: "title", note: "note"}]);
        done();
      });
      expect(service['storage'].query).toHaveBeenCalled();
    });

    it('saveNote works without an id', (done: Function) => {
      let note = {title: "some title", note: "some note", type: "note"};
      service.saveNote(note, () => {
          expect(service['storage'].query).toHaveBeenCalled();
          done();
      }, () => {});
    });

    it('saveNote works with an id', (done: Function) => {
      let note = {id: 1, title: "some title", note: "some note", type: "note"};
      service.saveNote(note, () => {
          expect(service['storage'].query).toHaveBeenCalled();
          done();
      }, () => {});
    });

    it('deleteAll sends a query', () => {
      service.deleteAll("note");
      expect(service['storage'].query).toHaveBeenCalled();
    });

    it('deleteDb sends a query', () => {
      service.deleteDb();
      expect(service['storage'].query).toHaveBeenCalled();
    });

  });
}