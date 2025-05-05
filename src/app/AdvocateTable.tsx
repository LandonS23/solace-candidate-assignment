"use client";
import { Advocate } from "@/types";
import { formatPhoneNumber } from "./utils";
import { useMemo } from "react";

export default function AdvocateTable({
  advocates,
  sortedCol,
  order,
  onHeaderClick,
}: {
  advocates: Advocate[];
  sortedCol: string;
  order: string;
  onHeaderClick: (key: keyof Advocate) => void;
}) {
  const icon = useMemo(() => {
    if (order) {
      return order === "asc" ? "↑" : "↓";
    } else {
      return null;
    }
  }, [order]);

  const headers: { key: keyof Advocate; display: string }[] = [
    {
      key: "firstName",
      display: "First Name",
    },
    {
      key: "lastName",
      display: "Last Name",
    },
    {
      key: "city",
      display: "City",
    },
    {
      key: "degree",
      display: "Degree",
    },
    {
      key: "specialties",
      display: "Specialties",
    },
    {
      key: "yearsOfExperience",
      display: "Years of Experience",
    },
    {
      key: "phoneNumber",
      display: "Phone Number",
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => {
            return (
              <th key={header.key} onClick={() => onHeaderClick(header.key)}>
                {header.display}
                {sortedCol === header.key && icon}
              </th>
            );
          })}
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
