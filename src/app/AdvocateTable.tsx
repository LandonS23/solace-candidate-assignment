"use client";
import { Advocate } from "@/types";
import { formatPhoneNumber } from "./utils";

export default function AdvocateTable({
  advocates,
  onHeaderClick,
}: {
  advocates: Advocate[];
  onHeaderClick: (key: keyof Advocate) => void;
}) {
  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => onHeaderClick("firstName")}>First Name</th>
          <th onClick={() => onHeaderClick("lastName")}>Last Name</th>
          <th onClick={() => onHeaderClick("city")}>City</th>
          <th onClick={() => onHeaderClick("degree")}>Degree</th>
          <th>Specialties</th>
          <th onClick={() => onHeaderClick("yearsOfExperience")}>
            Years of Experience
          </th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {advocates.map((advocate) => {
          return (
            <tr key={`advocate-${advocate.id}`}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((s, index) => (
                  <div key={`${advocate.id}-specialty-${index}`}>{s}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>
                <a href={`tel:+1${advocate.phoneNumber}`}>
                  {formatPhoneNumber(advocate.phoneNumber)}
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
