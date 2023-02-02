import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { Repositories } from '../../models/repository.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(
    private _translationService: TranslateService,
    private _http: HttpClient
  ) {}

  public getCurrentLanguage(): string {
    return this._translationService.currentLang;
  }

  public getRepositories(): Repositories | undefined {
    const existingRepositories = this.getSavedRepos();
    if (
      existingRepositories?.names?.length > 0 &&
      Date.now() - existingRepositories.timeStamp < 1000 * 60 * 60
    ) {
      return existingRepositories;
    } else {
      let repos!: Repositories;
      this._http
        .get('https://api.github.com/users/jjs98/repos')
        .subscribe((repositories: any) => {
          const repoNames: string[] = [];
          repositories.forEach((repository: any) => {
            repoNames.push(repository.name);
          });
          repos = { names: repoNames, timeStamp: Date.now() };
          this.setSavedRepos(repos);
        });
      return repos;
    }
  }

  private getSavedRepos(): Repositories {
    const existingRepositoriesValue = localStorage.getItem('repos');
    return existingRepositoriesValue
      ? JSON.parse(existingRepositoriesValue)
      : {};
  }

  private setSavedRepos(repos: Repositories) {
    localStorage.setItem('repos', JSON.stringify(repos));
  }
}
