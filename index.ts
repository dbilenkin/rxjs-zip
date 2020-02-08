import { of, merge, from, Observable, zip } from "rxjs";
import { map, scan, withLatestFrom } from "rxjs/operators";

interface Request {
  type: string;
  status: string;
}

const requests$ = from([
  [
    {
      type: "a",
      status: "requested"
    },
    {
      type: "b",
      status: "requested"
    },
    {
      type: "c",
      status: "requested"
    }
  ]
]);

const updatedActionIndex$ = of(1);

// const updatedRequests$ = requests$.pipe(
//   withLatestFrom(updatedActionIndex$),
//   map(([updatedRequests, updatedActionIndex]) => {
//     updatedRequests[updatedActionIndex].status = "updated";
//     return updatedRequests;
//   })
// );

const updatedRequests$ = zip(requests$, updatedActionIndex$).pipe(
  map(([updatedRequests, updatedActionIndex]) => {
    updatedRequests[updatedActionIndex].status = "updated";
    return updatedRequests;
  })
);

updatedRequests$.subscribe(x => console.log(x));
