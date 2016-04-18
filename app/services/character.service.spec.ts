import { TEST_BROWSER_PLATFORM_PROVIDERS, TEST_BROWSER_APPLICATION_PROVIDERS} from 'angular2/platform/testing/browser';
import { it, beforeEachProviders, inject, injectAsync, setBaseTestProviders } from 'angular2/testing';
import { provide } from 'angular2/core';
import { MockBackend, MockConnection } from 'angular2/http/testing';
import {Observable} from 'rxjs/Observable';
import { BaseRequestOptions, Http, HTTP_PROVIDERS, Response, ResponseOptions, XHRBackend} from 'angular2/http';
import { CharacterService } from './character.service';
import { Character } from '../character';

export function main() {

  describe('DataService', () => {

    beforeEachProviders(() => {
      return [HTTP_PROVIDERS, provide(XHRBackend, {useClass: MockBackend}), CharacterService];
    });

    it('should get characters',
      inject([XHRBackend, CharacterService], (mockBackend, characterService) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: [{
                  name: "Sena",
                  characteristics: {height: "162", weight: "125", eyes: "violet", hair: "black"},
                  biography: {bio: ""}
                }]
              })
            ));
          }
        );
        characterService.getCharacters().subscribe((chars: Character[]) => {
          expect(chars.length).toBe(1);
          expect(chars[0].name).toBe("Sena");
        });
      })
    );
  });
}