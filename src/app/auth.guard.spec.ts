import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationGuard } from './auth.guard';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

describe('AuthenticationGuard', () => {
  let guard: AuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthenticationGuard]
    });
    guard = TestBed.inject(AuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when authenticated', () => {
    const dummyRouteSnapshot = {} as ActivatedRouteSnapshot; // Creating a dummy ActivatedRouteSnapshot
    const dummyRouterStateSnapshot = {} as RouterStateSnapshot; // Creating a dummy RouterStateSnapshot
    const result = guard.canActivate(dummyRouteSnapshot, dummyRouterStateSnapshot);
    expect(result).toBe(true); // Adjust expectation based on your guard logic
  });
});