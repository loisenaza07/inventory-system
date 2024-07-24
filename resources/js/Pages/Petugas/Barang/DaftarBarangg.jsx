import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import moment from "moment";
import { FormattedNumber } from "react-intl";

// material-ui
import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

// third-party
import {
    useTable,
    useFilters,
    useGlobalFilter,
    usePagination,
} from "react-table";

// project-imports
import MainCard from "@/Components/MainCard";
import ScrollX from "@/Components/ScrollX";
import {
    CSVExport,
    EmptyTable,
    TablePagination,
} from "@/Components/third-party/ReactTable";

import {
    GlobalFilter,
    DefaultColumnFilter,
    SliderColumnFilter,
    NumberRangeColumnFilter,
    renderFilterTypes,
    DateColumnFilter,
} from "@/utils/react-table";
import { DocumentDownload, Edit, Eye } from "iconsax-react";
import axios from "axios";
import { exportToPdf } from "@/utils/exportToPdf";
import MainLayout from "@/Layouts/MainLayout";

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
    const filterTypes = useMemo(() => renderFilterTypes, []);
    const defaultColumn = useMemo(() => ({ Filter: DefaultColumnFilter }), []);
    const initialState = useMemo(
        () => ({
            filters: [{ id: "nama", value: "" }],
            pageIndex: 0,
            pageSize: 10,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        setPageSize,
        prepareRow,
        gotoPage,
        preGlobalFilteredRows,
        setGlobalFilter,
        state,
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            initialState,
            filterTypes,
        },
        useGlobalFilter,
        useFilters,
        usePagination
    );

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                sx={{ padding: 2 }}
            >
                <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
                <Stack direction="row" spacing={5} alignItems={"center"}>
                    <CSVExport
                        data={rows.map((d) => d.original)}
                        filename={"payroll.csv"}
                    />
                </Stack>
            </Stack>

            <Table {...getTableProps()}>
                <TableHead sx={{ borderTopWidth: 2 }}>
                    {headerGroups.map((headerGroup) => (
                        <TableRow
                            key={headerGroup.id}
                            {...headerGroup.getHeaderGroupProps()}
                        >
                            {headerGroup.headers.map((column) => (
                                <TableCell
                                    key={column.id}
                                    {...column.getHeaderProps([
                                        { className: column.className },
                                    ])}
                                >
                                    {column.render("Header")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {headerGroups.map((group) => (
                        <TableRow key={group} {...group.getHeaderGroupProps()}>
                            {group.headers.map((column) => {
                                return (
                                    <TableCell
                                        key={column}
                                        {...column.getHeaderProps([
                                            { className: column.className },
                                        ])}
                                    >
                                        {column.canFilter
                                            ? column.render("Filter")
                                            : null}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                    {page.length > 0 ? (
                        page.map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow key={row} {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell
                                                key={cell}
                                                {...cell.getCellProps([
                                                    {
                                                        className:
                                                            cell.column
                                                                .className,
                                                    },
                                                ])}
                                            >
                                                {cell.render("Cell")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })
                    ) : (
                        <EmptyTable msg="No Data" colSpan={7} />
                    )}
                    <TableRow>
                        <TableCell sx={{ Typography: 2 }} colSpan={7}>
                            <TablePagination
                                gotoPage={gotoPage}
                                rows={rows}
                                setPageSize={setPageSize}
                                pageIndex={state.pageIndex}
                                pageSize={state.pageSize}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </>
    );
}

ReactTable.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
};

// ==============================|| REACT TABLE - FILTERING ||============================== //

const DaftarBarang = (props) => {
    const [dataTable, setDataTable] = useState([]);
    const currencyFormatter = Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    });

    console.log(props);

    useEffect(() => {
        // Add serial number and format date
        const formattedData = props.barang?.map((item, index) => ({
            ...item,
            no: index + 1,
            user: item.user.name,
            jenis_barang: item.jenis_barang.jenis_barang,
            jenis_ruangan: item.ruangan.nama_ruangan,
            tahun_pengadaan: moment(item.tahun_pengadaan).format(
                "DD MMMM YYYY"
            ),
        }));
        setDataTable(formattedData);
    }, [props]);

    const columns = useMemo(
        () => [
            {
                Header: "No.",
                accessor: "no",
                Filter: false,
            },
            {
                Header: "No BMN",
                accessor: "no_bmn",
            },
            {
                Header: "Merk",
                accessor: "merk",
            },
            {
                Header: "Jenis Barang",
                accessor: "jenis_barang",
            },
            {
                Header: "Nilai Pengadaan",
                accessor: "nilai_pengadaan",
                Cell: ({ value }) => (
                    <FormattedNumber
                        value={value}
                        style="currency"
                        currency="IDR"
                    />
                ),
            },
            {
                Header: "Tanggal Pengadaan",
                accessor: "tahun_pengadaan",
                Filter: DateColumnFilter,
                filter: "between",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Aksi",
                accessor: "action",
                canFilter: false,
                Filter: false,
                Cell: ({ row }) => {
                    return (
                        <Tooltip title="Detail">
                            <IconButton
                                sx={{ width: "fit-content" }}
                                color="primary"
                            >
                                <Eye size={15} />
                            </IconButton>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    return (
        <MainLayout user={props?.auth.user} roles={props?.auth.roles}>
            <Head title="Daftar Barang" />
            <MainCard content={false}>
                <ScrollX>
                    <ReactTable columns={columns} data={dataTable} />
                </ScrollX>
            </MainCard>
        </MainLayout>
    );
};

DaftarBarang.propTypes = {
    value: PropTypes.string,
};

export default DaftarBarang;
