import { GitRepositories, Repository } from '../../models/repository.type';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(
    private _translationService: TranslateService,
    private _http: HttpClient
  ) {}

  public getCurrentLanguage(): string {
    return this._translationService.currentLang;
  }

  public getRepositories(): GitRepositories | undefined {
    const existingRepositories = this.getSavedRepos();
    if (
      existingRepositories?.names?.length > 0 &&
      Date.now() - existingRepositories.timeStamp < 1000 * 60 * 60
    ) {
      return existingRepositories;
    } else {
      let repos!: GitRepositories;
      this._http
        .get('https://api.github.com/users/jjs98/repos')
        .subscribe((repositories: object) => {
          const repoNames: string[] = [];
          (repositories as Repository[]).forEach((repository: Repository) => {
            repoNames.push(repository.name);
          });
          repos = { names: repoNames, timeStamp: Date.now() };
          this.setSavedRepos(repos);
        });
      return repos;
    }
  }

  private getSavedRepos(): GitRepositories {
    const existingRepositoriesValue = localStorage.getItem('repos');
    return existingRepositoriesValue
      ? JSON.parse(existingRepositoriesValue)
      : {};
  }

  private setSavedRepos(repos: GitRepositories) {
    localStorage.setItem('repos', JSON.stringify(repos));
  }
}
