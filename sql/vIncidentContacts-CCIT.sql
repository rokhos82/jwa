SELECT
  FileNumber,
  Incident,
  ContactDate,
  OffenseCode,
  OffenseDesc,
  Involvement,
  Contact_LocationConcat,
  Contact_LocationCity,
  Contact_LocationState,
  Contact_LocationZip,
  Contact_Comments,
  ContactsKey,
  FirstName,
  LastName,
  Middle,
  Juvenile,
  DOB,
  CitationNumber,
  Ticket_IssueDate,
  Ticket_IssueTime,
  Ticket_LocationConcat,
  Ticket_IssuedDateTime,
  Addr_Concat,
  Addr_State,
  Addr_City,
  Phone,
  Loc_GeoX,
  Loc_GeoY,
  OfficerSafety,
  Caution,
  ParticipantStatus,
  Participant,
  DriversLicense,
  DriversLicenseState,
  AltPhone,
  EmailAddress,
  Race,
  Sex,
  OfficerID,
  OfficerName,
  ArrestDate,
  Charge,
  ChargeDesc
FROM
  (SELECT
    c.FileNumber,
    c.Incident,
    c.ContactDate,
    c.OffenseCode,
    c.OffenseDesc,
    CASE WHEN lk.[Description] IS NOT NULL THEN (lk.[Description] + ' (' + c.Involvement + ')') ELSE c.Involvement END AS Involvement,
    c.Loc_City AS Contact_LocationCity,
    c.Loc_State AS Contact_LocationState,
    c.Loc_Zip AS Contact_LocationZip,
    c.Loc_Concat AS Contact_LocationConcat,
    c.Comments AS Contact_Comments,
    c.ContactsKey,
    ISNULL(n.First, '') AS FirstName,
    ISNULL(n.LastName, '') AS LastName,
    n.Middle,
    c.Juvenile,
    n.DOB,
    t.CitationNumber,
    t.IssuedDate AS Ticket_IssueDate,
    t.TimeIssued AS Ticket_IssueTime,
    t.Loc_Concat AS Ticket_LocationConcat,
    ISNULL(CONVERT(DateTime, CAST(YEAR(t.IssuedDate) AS varchar(10)) + '/' + CAST(MONTH(t.IssuedDate) AS varchar(10)) + '/' + CAST(DAY(t.IssuedDate) AS varchar(10)) + ' ' + CAST(DATEPART(hh, t.TimeIssued) AS varchar(10)) + ':' + CAST(DATEPART(n, t.TimeIssued) AS varchar(10))), CONVERT(DateTime, '1/1/2000')) AS Ticket_IssuedDateTime,
    n.Addr_Concat,
    n.Addr_State,
    n.Addr_City,
    n.Phone,
    c.Loc_GeoX,
    c.Loc_GeoY,
    CASE WHEN pc.filenumber IS NOT NULL THEN CAST(1 AS bit) ELSE CAST(0 AS bit) END AS OfficerSafety,
    ISNULL(n.Caution, '') AS Caution,
    ISNULL(c.ParticipantStatus, '') AS ParticipantStatus,
    ISNULL(c.Participant, '') AS Participant,
    n.OLN AS DriversLicense,
    n.OLNState AS DriversLicenseState,
    n.AltPhone,
    n.eMail AS EmailAddress,
    n.Race,
    n.Sex,
    c.ID AS OfficerID,
    p.OfficerName AS OfficerName,
    c.ArrestDate AS ArrestDate,
    c.Charge AS Charge,
    c.ChargeDesc AS ChargeDesc
  FROM
    dbo.Contacts AS c LEFT OUTER JOIN
      dbo.Ticket AS t ON t.CitationNumber = c.Citation AND c.Citation IS NOT NULL AND c.Citation <> '' LEFT OUTER JOIN
        dbo.Name AS n ON n.FileNumber = c.FileNumber LEFT OUTER JOIN
          (SELECT Value AS InvolvementKey, Description FROM dbo.Lookup WHERE (Name = 'Involvement')) AS lk ON lk.InvolvementKey = c.Involvement LEFT OUTER JOIN
            (SELECT FileNumber FROM dbo.Contacts WHERE (ParticipantStatus LIKE '**%')) AS pc ON pc.FileNumber = n.FileNumber LEFT OUTER JOIN
              (SELECT ID,(LastName + ',  ' + First + ' ' + Middle) AS OfficerName FROM dbo.Personel) as p ON c.ID = p.ID
  GROUP BY
    c.FileNumber,
    c.Incident,
    c.ContactDate,
    c.OffenseCode,
    c.OffenseDesc,
    c.Involvement,
    c.Loc_Concat,
    c.Loc_City,
    c.Loc_State,
    c.Loc_Zip,
    c.Comments,
    c.ContactsKey,
    n.First,
    n.LastName,
    n.Middle,
    c.Juvenile,
    n.DOB,
    t.CitationNumber,
    t.IssuedDate,
    t.TimeIssued,
    t.Loc_Concat,
    lk.Description,
    n.Addr_Concat,
    n.Addr_State,
    n.Addr_City,
    n.Phone,
    c.Loc_GeoX,
    c.Loc_GeoY,
    pc.FileNumber,
    n.Caution,
    c.ParticipantStatus,
    c.Participant,
    n.OLN,
    n.OLNState,
    n.AltPhone,
    n.eMail,
    n.Race,
    n.Sex,
    c.ID,
    p.OfficerName,
    c.ArrestDate,
    c.Charge,
    c.ChargeDesc) AS it
GROUP BY
    FileNumber,
    Incident,
    ContactDate,
    OffenseCode,
    OffenseDesc,
    Involvement,
    Contact_LocationConcat,
    Contact_LocationCity,
    Contact_LocationState,
    Contact_LocationZip,
    Contact_Comments,
    ContactsKey,
    FirstName,
    LastName,
    Middle,
    Juvenile,
    DOB,
    CitationNumber,
    Ticket_IssueDate,
    Ticket_IssueTime,
    Ticket_LocationConcat,
    Ticket_IssuedDateTime,
    Addr_Concat,
    Addr_State,
    Addr_City,
    Phone,
    Loc_GeoX,
    Loc_GeoY,
    OfficerSafety,
    Caution,
    ParticipantStatus,
    Participant,
    DriversLicense,
    DriversLicenseState,
    AltPhone,
    EmailAddress,
    Race,
    Sex,
    OfficerID,
    OfficerName,
    ArrestDate,
    Charge,
    ChargeDesc
