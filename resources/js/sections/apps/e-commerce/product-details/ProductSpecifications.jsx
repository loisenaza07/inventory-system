import PropTypes from "prop-types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import moment from "moment";

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
                    <Link href={"/pengaduan/buat-pengaduan"}>
                        <Button variant="contained">Buat Pengaduan</Button>
                    </Link>
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

const ProductSpecification = ({product}) => {
    const [dataTable, setDataTable] = useState([]);
    const [downloadValue, setDownloadValue] = useState({});
    const downloadRef = useRef(null);

    console.log(product);

    useEffect(() => {
        // Add serial number and format date
        const formattedData = product.pengaduans?.map((item, index) => ({
            ...item,
            no: index + 1,
            barang: item.merk,
            pelapor: item.user_pelapor.name,
            // jenis_layanan: item.jenis_layanan.jenis_layanan,
            created_at: moment(item.created_at).format("DD MMMM YYYY"),
        }));
        setDataTable(formattedData);
    }, [product]);

    const handleDownload = (value) => {
        setDownloadValue(value);
        setTimeout(() => {
            exportToPdf(downloadRef.current, "riwayat_pengaduan_" + value.nama);
        }, 500);
    };

    const columns = useMemo(
        () => [
            {
                Header: "No.",
                accessor: "no",
                Filter: false,
            },
            {
                Header: "Pelapor",
                accessor: "pelapor",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Keterangan",
                accessor: "keterangan",
            },
            {
                Header: "Tanggal Laporan",
                accessor: "created_at",
                Filter: DateColumnFilter,
                filter: "between",
            },
            {
                Header: "Aksi",
                accessor: "action",
                canFilter: false,
                Filter: false,
                Cell: ({ row }) => {
                    return (
                        <Tooltip title="Details">
                            <Link
                                href={`/pengaduan/riwayat-pengaduan/details/${row.original.id}`}
                            >
                                <IconButton
                                    sx={{ width: "fit-content" }}
                                    color="primary"
                                >
                                    <Eye size={15} />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    );
                },
            },
        ],
        []
    );

    return (
        <MainCard content={false}>
            <ScrollX>
                <ReactTable columns={columns} data={dataTable} />
            </ScrollX>
            <TableContainer
                component={Paper}
                ref={downloadRef}
                sx={{ position: "fixed", top: "-100%" }}
            >
                <Table sx={{ minWidth: 650 }}>
                    <TableBody sx={{ backgroundColor: "white" }}>
                        <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                            <TableCell sx={{ padding: 0 }}>
                                <Typography
                                    sx={{ padding: 1, fontWeight: 700 }}
                                >
                                    SLIP GAJI
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ padding: 0 }}></TableCell>
                            <TableCell sx={{ padding: 0 }}></TableCell>
                            <TableCell sx={{ padding: 0 }}></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography>Nama</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{downloadValue.nama}</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography>Alamat</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{downloadValue.alamat}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography>Jabatan</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{downloadValue.jabatan}</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography>No Telp.</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{downloadValue.no_telp}</Typography>
                            </TableCell>
                        </TableRow>

                        {/* Insert the rest of your table rows similarly */}
                        {/* Example row */}
                        <TableRow
                            sx={{ backgroundColor: "#eeeeee", height: 40 }}
                        >
                            <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                                PENDAPATAN
                            </TableCell>

                            <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
                                POTONGAN
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography>Gaji Pokok</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {downloadValue.gaji_pokok}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography>Potongan</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {downloadValue.potongan}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography>Lembur</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{downloadValue.lembur}</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Typography>Tunjangan</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {downloadValue.tunjangan}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                            <TableCell>
                                <Typography></Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Jumlah Pendapatan
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {downloadValue.gaji_pokok +
                                        downloadValue.lembur +
                                        downloadValue.tunjangan}
                                </Typography>
                            </TableCell>

                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Jumlah Potongan
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {downloadValue.potongan}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ backgroundColor: "#eeeeee" }}>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                <Typography></Typography>
                            </TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>
                                <Typography></Typography>
                            </TableCell>

                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Take Home Pay
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {downloadValue.total_pendapatan}
                                </Typography>
                            </TableCell>
                        </TableRow>
                        {/* Repeat for other rows */}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
};

ProductSpecification.propTypes = {
    value: PropTypes.string,
};

export default ProductSpecification;
