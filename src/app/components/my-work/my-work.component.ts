import { GitRepositories, Repository } from '../../models/repository.type';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-profile',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss'],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatDivider,
    NgIf,
    NgFor,
    TranslateModule
  ]
})
export class MyWorkComponent {
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
